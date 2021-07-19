import { NodePath, PluginObj, Visitor } from "@babel/core"
import * as BabelTypes from "@babel/types"
import { Program } from "@babel/types"

// matches any hook-like (the default)
const isHook = /^use[A-Z]/

// matches only built-in hooks provided by React et al
const isBuiltInHook = /^use(Callback|Context|DebugValue|Effect|ImperativeHandle|LayoutEffect|Memo|Reducer|Ref|State)$/

interface IState {
  opts?: {
    onlyBuiltIns?: boolean
    lib?: boolean
  }
}

export default function ({
  types: t,
}: {
  types: typeof BabelTypes
}): PluginObj<Program> {
  const visitor: Visitor = {
    CallExpression(path, state: IState): void {
      const onlyBuiltIns = state.opts?.onlyBuiltIns || false

      // if specified, options.lib is a list of libraries that provide hook functions
      const libs =
        state.opts?.lib === true ? [`react`, `preact/hooks`] : [state.opts!.lib]

      // skip function calls that are not the init of a variable declaration:
      if (!t.isVariableDeclarator(path.parent)) return

      // skip function calls where the return value is not Array-destructured:
      if (!t.isArrayPattern(path.parent.id)) return

      // name of the (hook) function being called:
      const hookName = (path.node.callee as BabelTypes.Identifier).name

      if (libs) {
        const binding = path.scope.getBinding(hookName)
        // not an import
        if (!binding || binding.kind !== `module`) return

        const specifier = (binding.path.parent as BabelTypes.ImportDeclaration)
          .source.value
        // not a match
        if (!libs.some(lib => lib === specifier)) return
      }

      // only match function calls with names that look like a hook
      if (!(onlyBuiltIns ? isBuiltInHook : isHook).test(hookName)) return

      path.parent.id = t.objectPattern(
        path.parent.id.elements.reduce(
          (acc: BabelTypes.ObjectProperty[], element, i) => {
            if (element) {
              acc.push(t.objectProperty(t.numericLiteral(i), element))
            }
            return acc
          },
          []
        )
      )
    },
  }

  return {
    name: `optimize-hook-destructuring`,
    visitor: {
      // this is a workaround to run before preset-env destroys destructured assignments
      Program<Program>(path: NodePath<Program>, state: any): void {
        path.traverse(visitor, state)
      },
    },
  }
}
