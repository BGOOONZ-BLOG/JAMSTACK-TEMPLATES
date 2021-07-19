import webpack from 'webpack'
import StaticSiteGeneratorPlugin from 'static-site-generator-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import Config from 'webpack-configurator'
import fs from 'fs'
import path from 'path'
import _ from 'lodash'
import invariant from 'invariant'
import toml from 'toml'
import babelConfig from './babel-config'

const debug = require('debug')('gatsby:webpack-config')

let modifyWebpackConfig
try {
  const gatsbyNodeConfig = path.resolve(process.cwd(), './gatsby-node')
  const nodeConfig = require(gatsbyNodeConfig)
  modifyWebpackConfig = nodeConfig.modifyWebpackConfig
} catch (e) {
  if (e.code !== 'MODULE_NOT_FOUND' && !_.includes(e.Error, 'gatsby-node')) {
    console.log(e)
  }
}

// Five stages or modes:
//   1) develop: for `gatsby develop` command, hot reload and CSS injection into page
//   2) develop-html: same as develop without react-hmre in the babel config for html renderer
//   3) build-css: build styles.css file
//   4) build-html: build all HTML files
//   5) build-javascript: Build bundle.js for Single Page App in production

module.exports = (program, directory, suppliedStage, webpackPort = 1500, routes = []) => {
  const babelStage = suppliedStage
  const stage = (suppliedStage === 'develop-html') ? 'develop' : suppliedStage

  let siteConfig = {}

  try {
    siteConfig = toml.parse(fs.readFileSync(path.join(directory, 'config.toml')))
  } catch (e) {
    if (e.code !== 'ENOENT') {
      throw e
    }
  }

  debug(`Loading webpack config for stage "${stage}"`)
  function output () {
    let publicPath = '/'

    if (program.prefixLinks && _.isString(siteConfig.linkPrefix)) {
      publicPath = siteConfig.linkPrefix

      if (!_.endsWith(publicPath, '/')) {
        publicPath += '/'
      }
    }

    switch (stage) {
      case 'develop':
        return {
          path: directory,
          filename: 'bundle.js',
          publicPath: `http://${program.host}:${webpackPort}/`,
        }
      case 'build-css':
        // Webpack will always generate a resultant javascript file.
        // But we don't want it for this step. Deleted by build-css.js.
        return {
          path: `${directory}/public`,
          filename: 'bundle-for-css.js',
          publicPath,
        }
      case 'build-html':
        // A temp file required by static-site-generator-plugin. See plugins function.
        // Deleted by build-html.js, since it's not needed for production.
        return {
          path: `${directory}/public`,
          filename: 'render-page.js',
          libraryTarget: 'umd',
          publicPath,
        }
      case 'build-javascript':
        return {
          filename: 'bundle.js',
          path: `${directory}/public`,
          publicPath,
        }
      default:
        throw new Error(`The state requested ${stage} doesn't exist.`)
    }
  }

  function entry () {
    switch (stage) {
      case 'develop':
        return [
          require.resolve('webpack-hot-middleware/client'),
          `${__dirname}/web-entry`,
        ]
      case 'build-css':
        return {
          main: `${__dirname}/web-entry`,
        }
      case 'build-html':
        return {
          main: `${__dirname}/static-entry`,
        }
      case 'build-javascript':
        return [
          `${__dirname}/web-entry`,
        ]
      default:
        throw new Error(`The state requested ${stage} doesn't exist.`)
    }
  }

  function plugins (config) {
    config.plugin('define', webpack.DefinePlugin, [{
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV ? process.env.NODE_ENV : 'development'),
      },
      __PREFIX_LINKS__: program.prefixLinks,
    }])

    switch (stage) {
      case 'develop':
        config.plugin('optimize-order', webpack.optimize.OccurenceOrderPlugin, null)
        config.plugin('hot-module-replacement', webpack.HotModuleReplacementPlugin, null)
        config.plugin('no-errors', webpack.NoErrorsPlugin, null)

        return config
      case 'build-css':
        config.plugin('extract-text', ExtractTextPlugin, ['styles.css'])

        return config
      case 'build-html':
        config.plugin('static-site-generator', StaticSiteGeneratorPlugin, ['render-page.js', routes])
        config.plugin('extract-text', ExtractTextPlugin, ['styles.css'])

        return config
      case 'build-javascript':
        config.plugin('ignore', webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/])
        config.plugin('extract-text', ExtractTextPlugin, ['styles.css'])
        config.plugin('dedupe', webpack.optimize.DedupePlugin, null)
        config.plugin('uglify', webpack.optimize.UglifyJsPlugin, null)

        return config
      default:
        throw new Error(`The state requested ${stage} doesn't exist.`)
    }
  }

  function resolve () {
    return {
      extensions: [
        '',
        '.js',
        '.jsx',
        '.cjsx',
        '.coffee',
        '.ts',
        '.tsx',
        '.json',
        '.less',
        '.css',
        '.scss',
        '.sass',
        '.toml',
        '.yml',
        '.yaml',
      ],
      // Hierarchy of directories for Webpack to look for module.
      // First is the site directory.
      // Then in the special directory of isomorphic modules Gatsby ships with.
      // Then the site's node_modules directory
      // and last the Gatsby node_modules directory.
      root: [
        directory,
        path.resolve(__dirname, '..', 'isomorphic'),
      ],
      // Alias for typescript, see: https://github.com/gaearon/react-hot-loader/issues/417#issuecomment-261548082
      alias: { 'react/lib/ReactMount': 'react-dom/lib/ReactMount' },
      modulesDirectories: [
        `${directory}/node_modules`,
        `${directory}/node_modules/gatsby/node_modules`,
        'node_modules',
      ],
    }
  }

  function devtool () {
    switch (stage) {
      case 'develop':
        return 'eval'
      case 'build-html':
        return false
      case 'build-javascript':
        return 'source-map'
      default:
        return false
    }
  }

  function loaders (config) {
    // Common config for every env.
    config.loader('cjsx', {
      test: /\.cjsx$/,
      loaders: ['coffee', 'cjsx'],
    })
    config.loader('js', {
      test: /\.jsx?$/, // Accept either .js or .jsx files.
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: babelConfig(program, babelStage),
    })
    config.loader('coffee', {
      test: /\.coffee$/,
      loader: 'coffee',
    })
    config.loader('typescript', {
      test: /\.tsx?$/,
      loaders: [
        'react-hot',
        'ts-loader',
      ],
    })
    config.loader('md', {
      test: /\.(md|rmd|mkdn?|mdwn|mdown|markdown|litcoffee)$/,
      loader: 'markdown',
    })
    config.loader('html', {
      test: /\.html$/,
      loader: 'html',
    })
    config.loader('ipynb', {
      test: /\.ipynb$/,
      loaders: ['json'],
    })
    config.loader('json', {
      test: /\.json$/,
      loaders: ['json'],
    })
    // Match everything except config.toml.
    config.loader('toml', {
      test: /^((?!config).)*\.toml$/,
      loaders: ['toml'],
    })
    config.loader('yaml', {
      test: /\.ya?ml/,
      loaders: ['json', 'yaml'],
    })
    config.loader('config', {
      test: /config\.toml/,
      loader: 'config',
      query: {
        directory,
      },
    })
    // Image loaders.
    config.loader('images', {
      test: /\.(jpe?g|png|gif|svg)(\?.*)?$/i,
      loaders: [
        'url-loader?limit=10000',
        'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}', // eslint-disable-line
      ],
    })
    // "file" loader makes sure those assets end up in the `public` folder.
    // When you `import` an asset, you get its filename.
    config.loader('file-loader', {
      test: /\.(ico|eot|otf|webp|ttf)(\?.*)?$/,
      loader: 'file',
    })
    // "url" loader works just like "file" loader but it also embeds
    // assets smaller than specified size as data URLs to avoid requests.
    config.loader('url-loader', {
      test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      loader: 'url',
      query: {
        limit: 7500,
      },
    })
    // Font loader.
    config.loader('woff', {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url',
      query: {
        limit: 15000, // Set high limit for inlining fonts as they're in the
        // critical path for rendering.
        mimetype: 'application/font-woff',
      },
    })

    const cssModulesConf = 'css?modules&minimize&importLoaders=1'
    const cssModulesConfDev =
      `${cssModulesConf}&sourceMap&localIdentName=[name]---[local]---[hash:base64:5]`

    switch (stage) {
      case 'develop':

        config.loader('css', {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          loaders: ['style', 'css', 'postcss'],
        })
        config.loader('less', {
          test: /\.less/,
          exclude: /\.module\.less$/,
          loaders: ['style', 'css', 'postcss', 'less'],
        })
        config.loader('sass', {
          test: /\.(sass|scss)/,
          exclude: /\.module\.(sass|scss)$/,
          loaders: ['style', 'css', 'postcss', 'sass'],
        })

        // CSS modules
        config.loader('cssModules', {
          test: /\.module\.css$/,
          loaders: ['style', cssModulesConfDev, 'postcss'],
        })
        config.loader('lessModules', {
          test: /\.module\.less/,
          loaders: ['style', cssModulesConfDev, 'less'],
        })
        config.loader('sassModules', {
          test: /\.module\.(sass|scss)/,
          loaders: ['style', cssModulesConfDev, 'sass'],
        })

        config.merge({
          postcss (wp) {
            return [
              require('postcss-import')({ addDependencyTo: wp }),
              require('postcss-cssnext')({ browsers: 'last 2 versions' }),
              require('postcss-browser-reporter'),
              require('postcss-reporter'),
            ]
          },
        })
        return config

      case 'build-css':
        config.loader('css', {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract(['css?minimize', 'postcss']),
          exclude: /\.module\.css$/,
        })
        config.loader('less', {
          test: /\.less/,
          exclude: /\.module\.less$/,
          loader: ExtractTextPlugin.extract(['css?minimize', 'postcss', 'less']),
        })
        config.loader('sass', {
          test: /\.(sass|scss)/,
          exclude: /\.module\.(sass|scss)$/,
          loader: ExtractTextPlugin.extract(['css?minimize', 'postcss', 'sass']),
        })

        // CSS modules
        config.loader('cssModules', {
          test: /\.module\.css$/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'postcss']),
        })
        config.loader('lessModules', {
          test: /\.module\.less/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'less']),
        })
        config.loader('sassModules', {
          test: /\.module\.(sass|scss)/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'sass']),
        })
        config.merge({
          postcss: [
            require('postcss-import')(),
            require('postcss-cssnext')({
              browsers: 'last 2 versions',
            }),
          ],
        })
        return config

      case 'build-html':
        // We don't deal with CSS at all when building the HTML.
        // The 'null' loader is used to prevent 'module not found' errors.
        // On the other hand CSS modules loaders are necessary.

        config.loader('css', {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          loader: 'null',
        })
        config.loader('less', {
          test: /\.less/,
          exclude: /\.module\.less$/,
          loader: 'null',
        })
        config.loader('sass', {
          test: /\.(sass|scss)/,
          exclude: /\.module\.(sass|scss)$/,
          loader: 'null',
        })

        // CSS modules
        config.loader('cssModules', {
          test: /\.module\.css$/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'postcss']),
        })
        config.loader('lessModules', {
          test: /\.module\.less/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'less']),
        })
        config.loader('sassModules', {
          test: /\.module\.(sass|scss)/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'sass']),
        })
        return config

      case 'build-javascript':
        // We don't deal with CSS at all when building the javascript.
        // The 'null' loader is used to prevent 'module not found' errors.
        // On the other hand CSS modules loaders are necessary.

        config.loader('css', {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          loader: 'null',
        })
        config.loader('less', {
          test: /\.less/,
          exclude: /\.module\.less$/,
          loader: 'null',
        })
        config.loader('sass', {
          test: /\.(sass|scss)/,
          exclude: /\.module\.(sass|scss)$/,
          loader: 'null',
        })

        // CSS modules
        config.loader('cssModules', {
          test: /\.module\.css$/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'postcss']),
        })
        config.loader('lessModules', {
          test: /\.module\.less/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'less']),
        })
        config.loader('sassModules', {
          test: /\.module\.(sass|scss)/,
          loader: ExtractTextPlugin.extract('style', [cssModulesConf, 'sass']),
        })
        return config

      default:
        return config
    }
  }

  function module (config) {
    plugins(config)
    loaders(config)

    return config
  }

  const config = new Config()

  config.merge({
    context: `${directory}/pages`,
    node: {
      __filename: true,
    },
    entry: entry(),
    debug: true,
    target: stage === 'build-html' ? 'node' : 'web',
    devtool: devtool(),
    output: output(),
    resolveLoader: {
      // Hierarchy of directories for Webpack to look for loaders.
      // First is the /loaders/ directory in the site.
      // Then in the special directory of loaders Gatsby ships with.
      // Then the site's node_modules directory
      // and last the Gatsby node_modules directory.
      root: [
        path.resolve(directory, 'loaders'),
        path.resolve(__dirname, '..', 'loaders'),
        path.resolve(directory, 'node_modules'),
        path.resolve(directory, 'node_modules/gatsby/node_modules'),
      ],
    },
    resolve: resolve(),
  })

  if (modifyWebpackConfig) {
    const modifiedWebpackConfig = modifyWebpackConfig(module(config), stage)
    invariant(_.isObject(modifiedWebpackConfig),
              `
              You must return an object when modifying the Webpack config.
              Returned: ${modifiedWebpackConfig}
              stage: ${stage}
              `)
    return modifiedWebpackConfig
  } else {
    return module(config)
  }
}
