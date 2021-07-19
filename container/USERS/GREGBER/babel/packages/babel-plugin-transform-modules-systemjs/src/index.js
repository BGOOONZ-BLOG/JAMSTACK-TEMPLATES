import { declare } from "@babel/helper-plugin-utils";
import hoistVariables from "@babel/helper-hoist-variables";
import { template, types as t } from "@babel/core";

const buildTemplate = template(`
  SYSTEM_REGISTER(MODULE_NAME, SOURCES, function (EXPORT_IDENTIFIER, CONTEXT_IDENTIFIER) {
    "use strict";
    BEFORE_BODY;
    return {
      setters: SETTERS,
      execute: function () {
        BODY;
      }
    };
  });
`);

const buildExportAll = template(`
  for (var KEY in TARGET) {
    if (KEY !== "default" && KEY !== "__esModule") EXPORT_OBJ[KEY] = TARGET[KEY];
  }
`);

function constructExportCall(
  path,
  exportIdent,
  exportNames,
  exportValues,
  exportStarTarget,
) {
  const statements = [];
  if (exportNames.length === 1) {
    statements.push(
      t.expressionStatement(
        t.callExpression(exportIdent, [
          t.stringLiteral(exportNames[0]),
          exportValues[0],
        ]),
      ),
    );
  } else if (!exportStarTarget) {
    const objectProperties = [];
    for (let i = 0; i < exportNames.length; i++) {
      const exportName = exportNames[i];
      const exportValue = exportValues[i];
      objectProperties.push(
        t.objectProperty(t.identifier(exportName), exportValue),
      );
    }
    statements.push(
      t.expressionStatement(
        t.callExpression(exportIdent, [t.objectExpression(objectProperties)]),
      ),
    );
  } else {
    const exportObj = path.scope.generateUid("exportObj");

    statements.push(
      t.variableDeclaration("var", [
        t.variableDeclarator(t.identifier(exportObj), t.objectExpression([])),
      ]),
    );

    statements.push(
      buildExportAll({
        KEY: path.scope.generateUidIdentifier("key"),
        EXPORT_OBJ: t.identifier(exportObj),
        TARGET: exportStarTarget,
      }),
    );

    for (let i = 0; i < exportNames.length; i++) {
      const exportName = exportNames[i];
      const exportValue = exportValues[i];

      statements.push(
        t.expressionStatement(
          t.assignmentExpression(
            "=",
            t.memberExpression(
              t.identifier(exportObj),
              t.identifier(exportName),
            ),
            exportValue,
          ),
        ),
      );
    }

    statements.push(
      t.expressionStatement(
        t.callExpression(exportIdent, [t.identifier(exportObj)]),
      ),
    );
  }
  return statements;
}

const TYPE_IMPORT = "Import";

export default declare((api, options) => {
  api.assertVersion(7);

  const { systemGlobal = "System" } = options;
  const IGNORE_REASSIGNMENT_SYMBOL = Symbol();

  const reassignmentVisitor = {
    "AssignmentExpression|UpdateExpression"(path) {
      if (path.node[IGNORE_REASSIGNMENT_SYMBOL]) return;
      path.node[IGNORE_REASSIGNMENT_SYMBOL] = true;

      const arg = path.get(path.isAssignmentExpression() ? "left" : "argument");

      if (arg.isObjectPattern() || arg.isArrayPattern()) {
        const exprs = [path.node];
        for (const name in arg.getBindingIdentifiers()) {
          if (this.scope.getBinding(name) !== path.scope.getBinding(name)) {
            return;
          }
          const exportedNames = this.exports[name];
          if (!exportedNames) return;
          for (const exportedName of exportedNames) {
            exprs.push(
              this.buildCall(exportedName, t.identifier(name)).expression,
            );
          }
        }
        path.replaceWith(t.sequenceExpression(exprs));
        return;
      }

      if (!arg.isIdentifier()) return;

      const name = arg.node.name;

      // redeclared in this scope
      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      const exportedNames = this.exports[name];
      if (!exportedNames) return;

      let node = path.node;

      // if it is a non-prefix update expression (x++ etc)
      // then we must replace with the expression (_export('x', x + 1), x++)
      // in order to ensure the same update expression value
      const isPostUpdateExpression = path.isUpdateExpression({ prefix: false });
      if (isPostUpdateExpression) {
        node = t.binaryExpression(
          node.operator[0],
          t.unaryExpression("+", t.cloneNode(node.argument)),
          t.numericLiteral(1),
        );
      }

      for (const exportedName of exportedNames) {
        node = this.buildCall(exportedName, node).expression;
      }

      if (isPostUpdateExpression) {
        node = t.sequenceExpression([node, path.node]);
      }

      path.replaceWith(node);
    },
  };

  return {
    visitor: {
      CallExpression(path, state) {
        if (path.node.callee.type === TYPE_IMPORT) {
          path.replaceWith(
            t.callExpression(
              t.memberExpression(
                t.identifier(state.contextIdent),
                t.identifier("import"),
              ),
              path.node.arguments,
            ),
          );
        }
      },

      MetaProperty(path, state) {
        if (
          path.node.meta.name === "import" &&
          path.node.property.name === "meta"
        ) {
          path.replaceWith(
            t.memberExpression(
              t.identifier(state.contextIdent),
              t.identifier("meta"),
            ),
          );
        }
      },

      ReferencedIdentifier(path, state) {
        if (
          path.node.name == "__moduleName" &&
          !path.scope.hasBinding("__moduleName")
        ) {
          path.replaceWith(
            t.memberExpression(
              t.identifier(state.contextIdent),
              t.identifier("id"),
            ),
          );
        }
      },

      Program: {
        enter(path, state) {
          state.contextIdent = path.scope.generateUid("context");
        },
        exit(path, state) {
          const exportIdent = path.scope.generateUid("export");
          const contextIdent = state.contextIdent;

          const exportNames = Object.create(null);
          const modules = [];

          let beforeBody = [];
          const setters = [];
          const sources = [];
          const variableIds = [];
          const removedPaths = [];

          function addExportName(key, val) {
            exportNames[key] = exportNames[key] || [];
            exportNames[key].push(val);
          }

          function pushModule(source, key, specifiers) {
            let module;
            modules.forEach(function(m) {
              if (m.key === source) {
                module = m;
              }
            });
            if (!module) {
              modules.push(
                (module = { key: source, imports: [], exports: [] }),
              );
            }
            module[key] = module[key].concat(specifiers);
          }

          function buildExportCall(name, val) {
            return t.expressionStatement(
              t.callExpression(t.identifier(exportIdent), [
                t.stringLiteral(name),
                val,
              ]),
            );
          }

          const body: Array<Object> = path.get("body");

          for (const path of body) {
            if (path.isFunctionDeclaration()) {
              beforeBody.push(path.node);
              removedPaths.push(path);
            } else if (path.isImportDeclaration()) {
              const source = path.node.source.value;
              pushModule(source, "imports", path.node.specifiers);
              for (const name in path.getBindingIdentifiers()) {
                path.scope.removeBinding(name);
                variableIds.push(t.identifier(name));
              }
              path.remove();
            } else if (path.isExportAllDeclaration()) {
              pushModule(path.node.source.value, "exports", path.node);
              path.remove();
            } else if (path.isExportDefaultDeclaration()) {
              const declar = path.get("declaration");
              if (
                declar.isClassDeclaration() ||
                declar.isFunctionDeclaration()
              ) {
                const id = declar.node.id;
                const nodes = [];

                if (id) {
                  nodes.push(declar.node);
                  nodes.push(buildExportCall("default", t.cloneNode(id)));
                  addExportName(id.name, "default");
                } else {
                  nodes.push(
                    buildExportCall("default", t.toExpression(declar.node)),
                  );
                }

                if (declar.isClassDeclaration()) {
                  path.replaceWithMultiple(nodes);
                } else {
                  beforeBody = beforeBody.concat(nodes);
                  removedPaths.push(path);
                }
              } else {
                path.replaceWith(buildExportCall("default", declar.node));
              }
            } else if (path.isExportNamedDeclaration()) {
              const declar = path.get("declaration");

              if (declar.node) {
                path.replaceWith(declar);

                if (path.isFunction()) {
                  const node = declar.node;
                  const name = node.id.name;
                  addExportName(name, name);
                  beforeBody.push(node);
                  beforeBody.push(buildExportCall(name, t.cloneNode(node.id)));
                  removedPaths.push(path);
                } else if (path.isClass()) {
                  const name = declar.node.id.name;
                  addExportName(name, name);
                  path.insertAfter([buildExportCall(name, t.identifier(name))]);
                } else {
                  for (const name in declar.getBindingIdentifiers()) {
                    addExportName(name, name);
                  }
                }
              } else {
                const specifiers = path.node.specifiers;
                if (specifiers && specifiers.length) {
                  if (path.node.source) {
                    pushModule(path.node.source.value, "exports", specifiers);
                    path.remove();
                  } else {
                    const nodes = [];

                    for (const specifier of specifiers) {
                      const binding = path.scope.getBinding(
                        specifier.local.name,
                      );
                      // hoisted function export
                      if (
                        binding &&
                        t.isFunctionDeclaration(binding.path.node)
                      ) {
                        beforeBody.push(
                          buildExportCall(
                            specifier.exported.name,
                            t.cloneNode(specifier.local),
                          ),
                        );
                      }
                      // only globals also exported this way
                      else if (!binding) {
                        nodes.push(
                          buildExportCall(
                            specifier.exported.name,
                            specifier.local,
                          ),
                        );
                      }
                      addExportName(
                        specifier.local.name,
                        specifier.exported.name,
                      );
                    }

                    path.replaceWithMultiple(nodes);
                  }
                }
              }
            }
          }

          modules.forEach(function(specifiers) {
            let setterBody = [];
            const target = path.scope.generateUid(specifiers.key);

            for (let specifier of specifiers.imports) {
              if (t.isImportNamespaceSpecifier(specifier)) {
                setterBody.push(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      specifier.local,
                      t.identifier(target),
                    ),
                  ),
                );
              } else if (t.isImportDefaultSpecifier(specifier)) {
                specifier = t.importSpecifier(
                  specifier.local,
                  t.identifier("default"),
                );
              }

              if (t.isImportSpecifier(specifier)) {
                setterBody.push(
                  t.expressionStatement(
                    t.assignmentExpression(
                      "=",
                      specifier.local,
                      t.memberExpression(
                        t.identifier(target),
                        specifier.imported,
                      ),
                    ),
                  ),
                );
              }
            }

            if (specifiers.exports.length) {
              const exportNames = [];
              const exportValues = [];
              let hasExportStar = false;

              for (const node of specifiers.exports) {
                if (t.isExportAllDeclaration(node)) {
                  hasExportStar = true;
                } else if (t.isExportSpecifier(node)) {
                  exportNames.push(node.exported.name);
                  exportValues.push(
                    t.memberExpression(t.identifier(target), node.local),
                  );
                } else {
                  // todo
                }
              }

              setterBody = setterBody.concat(
                constructExportCall(
                  path,
                  t.identifier(exportIdent),
                  exportNames,
                  exportValues,
                  hasExportStar ? t.identifier(target) : null,
                ),
              );
            }

            sources.push(t.stringLiteral(specifiers.key));
            setters.push(
              t.functionExpression(
                null,
                [t.identifier(target)],
                t.blockStatement(setterBody),
              ),
            );
          });

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = t.stringLiteral(moduleName);

          const uninitializedVars = [];
          hoistVariables(
            path,
            (id, name, hasInit) => {
              variableIds.push(id);
              if (!hasInit) {
                uninitializedVars.push(name);
              }
            },
            null,
          );

          if (variableIds.length) {
            beforeBody.unshift(
              t.variableDeclaration(
                "var",
                variableIds.map(id => t.variableDeclarator(id)),
              ),
            );
          }

          if (uninitializedVars.length) {
            const undefinedValues = [];
            const undefinedIdent = path.scope.buildUndefinedNode();
            for (let i = 0; i < uninitializedVars.length; i++) {
              undefinedValues[i] = undefinedIdent;
            }
            beforeBody = beforeBody.concat(
              constructExportCall(
                path,
                t.identifier(exportIdent),
                uninitializedVars,
                undefinedValues,
                null,
              ),
            );
          }

          path.traverse(reassignmentVisitor, {
            exports: exportNames,
            buildCall: buildExportCall,
            scope: path.scope,
          });

          for (const path of removedPaths) {
            path.remove();
          }

          path.node.body = [
            buildTemplate({
              SYSTEM_REGISTER: t.memberExpression(
                t.identifier(systemGlobal),
                t.identifier("register"),
              ),
              BEFORE_BODY: beforeBody,
              MODULE_NAME: moduleName,
              SETTERS: t.arrayExpression(setters),
              SOURCES: t.arrayExpression(sources),
              BODY: path.node.body,
              EXPORT_IDENTIFIER: t.identifier(exportIdent),
              CONTEXT_IDENTIFIER: t.identifier(contextIdent),
            }),
          ];
        },
      },
    },
  };
});
