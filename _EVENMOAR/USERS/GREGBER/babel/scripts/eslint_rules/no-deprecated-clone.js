// @flow

"use strict";

function getVariableDefinition(name /*: string */, scope /*: Scope */) {
  let currentScope = scope;
  do {
    const variable = currentScope.set.get(name);
    if (variable && variable.defs[0]) {
      return { scope: currentScope, definition: variable.defs[0] };
    }
  } while ((currentScope = currentScope.upper));
}

/*::
type ReferenceOriginImport = { kind: "import", source: string, name: string };
type ReferenceOriginParam = {
  kind: "export param",
  exportName: string,
  index: number,
};

type ReferenceOrigin =
  | ReferenceOriginImport
  | ReferenceOriginParam
  | { kind: "import *", source: string }
  | {
      kind: "property",
      base: ReferenceOriginImport | ReferenceOriginParam,
      path: string,
    };
*/

// Given a node and a context, returns a description of where its value comes
// from.
// It resolves imports, parameters of exported functions and property accesses.
// See the ReferenceOrigin type for more informations.
function getReferenceOrigin(
  node /*: Node */,
  scope /*: Scope */
) /*: ?ReferenceOrigin */ {
  if (node.type === "Identifier") {
    const variable = getVariableDefinition(node.name, scope);
    if (!variable) return null;

    const definition = variable.definition;
    const defNode = definition.node;

    if (definition.type === "ImportBinding") {
      if (defNode.type === "ImportSpecifier") {
        return {
          kind: "import",
          source: definition.parent.source.value,
          name: defNode.imported.name,
        };
      }
      if (defNode.type === "ImportNamespaceSpecifier") {
        return {
          kind: "import *",
          source: definition.parent.source.value,
        };
      }
    }

    if (definition.type === "Variable" && defNode.init) {
      const origin = getReferenceOrigin(defNode.init, variable.scope);
      return origin && patternToProperty(definition.name, origin);
    }

    if (definition.type === "Parameter") {
      const parent = defNode.parent;
      let exportName /*: string */;
      if (parent.type === "ExportDefaultDeclaration") {
        exportName = "default";
      } else if (parent.type === "ExportNamedDeclaration") {
        exportName = defNode.id.name;
      } else if (
        parent.type === "AssignmentExpression" &&
        parent.left.type === "MemberExpression" &&
        parent.left.object.type === "Identifier" &&
        parent.left.object.name === "module" &&
        parent.left.property.type === "Identifier" &&
        parent.left.property.name === "exports"
      ) {
        exportName = "module.exports";
      } else {
        return null;
      }
      return patternToProperty(definition.name, {
        kind: "export param",
        exportName,
        index: definition.index,
      });
    }
  }

  if (node.type === "MemberExpression" && !node.computed) {
    const origin = getReferenceOrigin(node.object, scope);
    return origin && addProperty(origin, node.property.name);
  }

  return null;
}

function patternToProperty(
  id /*: Node */,
  base /*: ReferenceOrigin */
) /*: ?ReferenceOrigin */ {
  const path = getPatternPath(id);
  return path && path.reduce(addProperty, base);
}

// Adds a property to a given origin. If it was a namespace import it becomes
// a named import, so that `import * as x from "foo"; x.bar` and
// `import { bar } from "foo"` have the same origin.
function addProperty(
  origin /*: ReferenceOrigin */,
  name /*: string */
) /* ReferenceOrigin */ {
  if (origin.kind === "import *") {
    return {
      kind: "import",
      source: origin.source,
      name,
    };
  }
  if (origin.kind === "property") {
    return {
      kind: "property",
      base: origin.base,
      path: origin.path + "." + name,
    };
  }
  return {
    kind: "property",
    base: origin,
    path: name,
  };
}

// if "node" is c of { a: { b: c } }, the result is ["a","b"]
function getPatternPath(node /*: Node */) /*: ?string[] */ {
  let current = node;
  const path = [];

  // Unshift keys to path while going up
  do {
    const property = current.parent;
    if (
      property.type === "ArrayPattern" ||
      property.type === "AssignmentPattern" ||
      property.computed
    ) {
      // These nodes are not supported.
      return null;
    }
    if (property.type === "Property") {
      path.unshift(property.key.name);
    } else {
      // The destructuring pattern is finished
      break;
    }
  } while ((current = current.parent.parent));

  return path;
}

function reportError(context /*: Context */, node /*: Node */) {
  const isMemberExpression = node.type === "MemberExpression";
  const id = isMemberExpression ? node.property : node;
  context.report({
    node: id,
    message: `t.${id.name}() is deprecated. Use t.cloneNode() instead.`,
    fix(fixer) {
      if (isMemberExpression) {
        return fixer.replaceText(id, "cloneNode");
      }
    },
  });
}

module.exports = {
  meta: {
    schema: [],
    fixable: "code",
  },
  create(context /*: Context */) {
    return {
      CallExpression(node /*: Node */) {
        const origin = getReferenceOrigin(node.callee, context.getScope());

        if (!origin) return;

        if (
          origin.kind === "import" &&
          (origin.name === "clone" || origin.name === "cloneDeep") &&
          origin.source === "@babel/types"
        ) {
          // imported from @babel/types
          return reportError(context, node.callee);
        }

        if (
          origin.kind === "property" &&
          (origin.path === "clone" || origin.path === "cloneDeep") &&
          origin.base.kind === "import" &&
          origin.base.name === "types" &&
          origin.base.source === "@babel/core"
        ) {
          // imported from @babel/core
          return reportError(context, node.callee);
        }

        if (
          origin.kind === "property" &&
          (origin.path === "types.clone" ||
            origin.path === "types.cloneDeep") &&
          origin.base.kind === "export param" &&
          (origin.base.exportName === "default" ||
            origin.base.exportName === "module.exports") &&
          origin.base.index === 0
        ) {
          // export default function ({ types: t }) {}
          // module.exports = function ({ types: t }) {}
          return reportError(context, node.callee);
        }
      },
    };
  },
};

/*:: // ESLint types

type Node = { type: string, [string]: any };

type Definition = {
  type: "ImportedBinding",
  name: Node,
  node: Node,
  parent: Node,
};

type Variable = {
  defs: Definition[],
};

type Scope = {
  set: Map<string, Variable>,
  upper: ?Scope,
};

type Context = {
  report(options: {
    node: Node,
    message: string,
    fix?: (fixer: Fixer) => ?Fixer,
  }): void,

  getScope(): Scope,
};

type Fixer = {
  replaceText(node: Node, replacement: string): Fixer,
};
*/
