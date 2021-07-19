const r = require(`./resolver`)

function preset(context, options = {}) {
  const { browser = false, debug = false, nodeVersion = `10.13.0` } = options
  const { NODE_ENV, BABEL_ENV } = process.env

  const IS_TEST = (BABEL_ENV || NODE_ENV) === `test`

  const browserConfig = {
    useBuiltIns: false,
    targets: {
      browsers: [`last 2 versions`, `not ie <= 11`, `not android 4.4.3`],
    },
  }

  const nodeConfig = {
    corejs: 3,
    useBuiltIns: `entry`,
    targets: {
      node: nodeVersion,
    },
  }

  return {
    presets: [
      [
        r(`@babel/preset-env`),
        Object.assign(
          {
            loose: true,
            debug: !!debug,
            shippedProposals: true,
            modules: `commonjs`,
          },
          browser ? browserConfig : nodeConfig
        ),
      ],
      [r(`@babel/preset-react`)],
      r(`@babel/preset-flow`),
    ],
    plugins: [
      r(`@babel/plugin-proposal-nullish-coalescing-operator`),
      r(`@babel/plugin-proposal-optional-chaining`),
      r(`@babel/plugin-transform-runtime`),
      r(`@babel/plugin-syntax-dynamic-import`),
      IS_TEST && r(`babel-plugin-dynamic-import-node`),
    ].filter(Boolean),
    overrides: [
      {
        test: [`**/*.ts`, `**/*.tsx`],
        plugins: [[`@babel/plugin-transform-typescript`, { isTSX: true }]],
      },
    ],
  }
}

module.exports = preset
