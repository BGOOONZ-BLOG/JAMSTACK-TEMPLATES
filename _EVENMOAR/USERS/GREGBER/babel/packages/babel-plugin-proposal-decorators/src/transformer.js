import { types as t, template } from "@babel/core";
import splitExportDeclaration from "@babel/helper-split-export-declaration";
import ReplaceSupers from "@babel/helper-replace-supers";

function prop(key, value) {
  if (!value) return null;
  return t.objectProperty(t.identifier(key), value);
}

function value(body, params = [], async, generator) {
  const method = t.objectMethod("method", t.identifier("value"), params, body);
  method.async = !!async;
  method.generator = !!generator;
  return method;
}

function hasDecorators({ node }) {
  if (node.decorators && node.decorators.length > 0) return true;

  const body = node.body.body;
  for (let i = 0; i < body.length; i++) {
    const method = body[i];
    if (method.decorators && method.decorators.length > 0) {
      return true;
    }
  }

  return false;
}

function takeDecorators({ node }) {
  let result;
  if (node.decorators && node.decorators.length > 0) {
    result = t.arrayExpression(
      node.decorators.map(decorator => decorator.expression),
    );
  }
  node.decorators = undefined;
  return result;
}

function getKey(node) {
  if (node.computed) {
    return node.key;
  } else if (t.isIdentifier(node.key)) {
    return t.stringLiteral(node.key.name);
  } else {
    return t.stringLiteral(String(node.key.value));
  }
}

function getSingleElementDefinition(path, superRef, classRef, file) {
  const { node, scope } = path;
  const isMethod = path.isClassMethod();

  if (path.isPrivate()) {
    throw path.buildCodeFrameError(
      `Private ${
        isMethod ? "methods" : "fields"
      } in decorated classes are not supported yet.`,
    );
  }

  new ReplaceSupers(
    {
      methodPath: path,
      methodNode: node,
      objectRef: classRef,
      isStatic: node.static,
      superRef,
      scope,
      file,
    },
    true,
  ).replace();

  const properties = [
    prop("kind", t.stringLiteral(isMethod ? node.kind : "field")),
    prop("decorators", takeDecorators(path)),
    prop("static", node.static && t.booleanLiteral(true)),
    prop("key", getKey(node)),
    isMethod
      ? value(node.body, node.params, node.async, node.generator)
      : node.value
        ? value(template.ast`{ return ${node.value} }`)
        : prop("value", scope.buildUndefinedNode()),
  ].filter(Boolean);

  return t.objectExpression(properties);
}

function getElementsDefinitions(path, fId, file) {
  const elements = [];
  for (const p of path.get("body.body")) {
    if (!p.isClassMethod({ kind: "constructor" })) {
      elements.push(
        getSingleElementDefinition(p, path.node.superClass, fId, file),
      );
      p.remove();
    }
  }

  return t.arrayExpression(elements);
}

function getConstructorPath(path) {
  return path
    .get("body.body")
    .find(path => path.isClassMethod({ kind: "constructor" }));
}

const bareSupersVisitor = {
  CallExpression(path, { initializeInstanceElements }) {
    if (path.get("callee").isSuper()) {
      path.insertAfter(t.cloneNode(initializeInstanceElements));

      // Sometimes this path gets requeued (e.g. in (super(), foo)), and
      // it leads to infinite recursion.
      path.skip();
    }
  },
  Function(path) {
    if (!path.isArrowFunctionExpression()) path.skip();
  },
};

function insertInitializeInstanceElements(path, initializeInstanceId) {
  const isBase = !path.node.superClass;
  const initializeInstanceElements = t.callExpression(initializeInstanceId, [
    t.thisExpression(),
  ]);

  const constructorPath = getConstructorPath(path);
  if (constructorPath) {
    if (isBase) {
      constructorPath
        .get("body")
        .unshiftContainer("body", [
          t.expressionStatement(initializeInstanceElements),
        ]);
    } else {
      constructorPath.traverse(bareSupersVisitor, {
        initializeInstanceElements,
      });
    }
  } else {
    const constructor = isBase
      ? t.classMethod(
          "constructor",
          t.identifier("constructor"),
          [],
          t.blockStatement([t.expressionStatement(initializeInstanceElements)]),
        )
      : t.classMethod(
          "constructor",
          t.identifier("constructor"),
          [t.restElement(t.identifier("args"))],
          t.blockStatement([
            t.expressionStatement(
              t.callExpression(t.Super(), [
                t.spreadElement(t.identifier("args")),
              ]),
            ),
            t.expressionStatement(initializeInstanceElements),
          ]),
        );
    path.node.body.body.push(constructor);
  }
}

function transformClass(path, file) {
  const isDeclaration = path.node.id && path.isDeclaration();
  const isStrict = path.isInStrictMode();
  const { superClass } = path.node;

  path.node.type = "ClassDeclaration";
  if (!path.node.id) path.node.id = path.scope.generateUidIdentifier("class");

  const initializeId = path.scope.generateUidIdentifier("initialize");
  const superId =
    superClass &&
    path.scope.generateUidIdentifierBasedOnNode(path.node.superClass, "super");

  if (superClass) path.node.superClass = superId;

  const classDecorators = takeDecorators(path);
  const definitions = getElementsDefinitions(path, path.node.id, file);

  insertInitializeInstanceElements(path, initializeId);

  const expr = template.expression.ast`
      ${addDecorateHelper(file)}(
        ${classDecorators || t.nullLiteral()},
        function (${initializeId}, ${superClass ? superId : null}) {
          ${path.node}
          return { F: ${t.cloneNode(path.node.id)}, d: ${definitions} };
        },
        ${superClass}
      )
    `;
  if (!isStrict) {
    expr.arguments[1].body.directives.push(
      t.directive(t.directiveLiteral("use strict")),
    );
  }

  return isDeclaration ? template.ast`let ${path.node.id} = ${expr}` : expr;
}

function addDecorateHelper(file) {
  try {
    return file.addHelper("decorate");
  } catch (err) {
    if (err.code === "BABEL_HELPER_UNKNOWN") {
      err.message +=
        "\n  '@babel/plugin-transform-decorators' in non-legacy mode" +
        " requires '@babel/core' version ^7.0.2 and you appear to be using" +
        " an older version.";
    }
    throw err;
  }
}

export default {
  ExportDefaultDeclaration(path) {
    let decl = path.get("declaration");
    if (!decl.isClassDeclaration() || !hasDecorators(decl)) return;

    if (decl.node.id) decl = splitExportDeclaration(path);

    decl.replaceWith(transformClass(decl, this.file));
  },

  Class(path) {
    if (hasDecorators(path)) {
      path.replaceWith(transformClass(path, this.file));
    }
  },
};
