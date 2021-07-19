/* @flow weak */
/* eslint import/imports-first: 0 */
require('node-cjsx').transform()
import Hapi from 'hapi'
import Boom from 'boom'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import webpack from 'webpack'
import Negotiator from 'negotiator'
import parsePath from 'parse-filepath'
import _ from 'lodash'
import webpackRequire from 'webpack-require'
import WebpackPlugin from 'hapi-webpack-plugin'
import opn from 'opn'
import fs from 'fs'
import glob from 'glob'
import chalk from 'chalk'
import startWithDynamicPort from './startWithDynamicPort'

import globPages from './glob-pages'
import webpackConfig from './webpack.config'
const debug = require('debug')('gatsby:application')

// Display a nice noscript message in dev mode explaining that server-side rendering
// is not enabled in develop mode
const devNoScript = `<noscript>
  The Gatsby development server does not work without JavaScript enabled.
  If you'd like to test how your site works without JavaScript, first build the site
  'gatsby build' and then serve the built site 'gatsby serve-build'
</noscript>`

function startServer (program) {
  const directory = program.directory

  // Load pages for the site.
  return globPages(directory, (err, pages) => {
    const compilerConfig = webpackConfig(program, directory, 'develop', program.port)

    const compiler = webpack(compilerConfig.resolve())

    let HTMLPath = `${directory}/html`
    // Check if we can't find an html component in root of site.
    if (glob.sync(`${HTMLPath}.*`).length === 0) {
      HTMLPath = '../isomorphic/html'
    }

    const htmlCompilerConfig = webpackConfig(program, directory, 'develop-html', program.port)

    webpackRequire(htmlCompilerConfig.resolve(), require.resolve(HTMLPath), (error, factory) => {
      if (error) {
        console.log(`Failed to require ${directory}/html.js`)
        error.forEach((e) => {
          console.log(e)
        })
        process.exit()
      }
      const HTML = factory()
      debug('Configuring develop server')

      const server = new Hapi.Server()

      server.connection({
        host: program.host,
        port: program.port,
      })

      server.route({
        method: 'GET',
        path: '/html/{path*}',
        handler: (request, reply) => {
          if (request.path === 'favicon.ico') {
            return reply(Boom.notFound())
          }

          try {
            const htmlElement = React.createElement(
              HTML, {
                body: devNoScript,
              },
            )
            let html = ReactDOMServer.renderToStaticMarkup(htmlElement)
            html = `<!DOCTYPE html>\n${html}`
            return reply(html)
          } catch (e) {
            console.log(e.stack)
            throw e
          }
        },
      })

      server.route({
        method: 'GET',
        path: '/{path*}',
        handler: {
          directory: {
            path: `${program.directory}/pages`,
            listing: false,
            index: false,
          },
        },
      })

      server.ext('onRequest', (request, reply) => {
        const negotiator = new Negotiator(request.raw.req)

        // Try to map the url path to match an actual path of a file on disk.
        const parsed = parsePath(request.path)
        const page = _.find(pages, p => p.path === (`${parsed.dirname}/`))

        let absolutePath = `${program.directory}/pages`
        let path
        if (page) {
          path = `/${parsePath(page.requirePath).dirname}/${parsed.basename}`
          absolutePath += `/${parsePath(page.requirePath).dirname}/${parsed.basename}`
        } else {
          path = request.path
          absolutePath += request.path
        }
        let isFile = false
        try {
          isFile = fs.lstatSync(absolutePath).isFile()
        } catch (e) {
          // Ignore.
        }

        // If the path matches a file, return that.
        if (isFile) {
          request.setUrl(path)
          reply.continue()
        // Let people load the bundle.js directly.
        } else if (request.path === '/bundle.js') {
          reply.continue()
        } else if (negotiator.mediaType() === 'text/html') {
          // If the path does not end with a slash, add it.
          if (request.path[request.path.length - 1] !== '/') {
            request.path += '/' // eslint-disable-line no-param-reassign
          }
          request.setUrl(`/html${request.path}`)
          reply.continue()
        } else {
          reply.continue()
        }
      })

      const assets = {
        noInfo: true,
        reload: true,
        publicPath: compilerConfig._config.output.publicPath,
      }
      const hot = {
        hot: true,
        quiet: true,
        noInfo: true,
        host: program.host,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        stats: {
          colors: true,
        },
      }

      return server.register({
        register: WebpackPlugin,
        options: {
          compiler,
          assets,
          hot,
        },
      }, (er) => {
        if (er) {
          console.log(er)
          process.exit()
        }

        server.start((e) => {
          if (e) {
            if (e.code === 'EADDRINUSE') {
              // eslint-disable-next-line max-len
              console.log(chalk.red(`Unable to start Gatsby on port ${program.port} as there's already a process listing on that port.`))
            } else {
              console.log(chalk.red(e))
            }

            process.exit()
          } else {
            if (program.open) {
              opn(server.info.uri)
            }
            console.log(chalk.green('Server started successfully!'))
            console.log()
            console.log('Listening at:')
            console.log()
            console.log('  ', chalk.cyan(server.info.uri))
          }
        })
      })
    })
  })
}

module.exports = startWithDynamicPort(startServer)
