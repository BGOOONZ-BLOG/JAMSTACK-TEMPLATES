const next = require('next')
const qs = require('querystring')
const url = require('url')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

function removeEndSlash(fn) {
  return (req, res) => {
    const parsedUrl = url.parse(req.url, true)
    const isNext = parsedUrl.path.includes('/_next/')
    if (isNext) return fn(req, res, parsedUrl)

    if (parsedUrl.path !== '/' && parsedUrl.path.slice(-1) === '/') {
      const q = qs.stringify(parsedUrl.query)
      res.writeHead(301, {
        Location: parsedUrl.path.slice(0, -1) + (q ? '?' + q : '')
      })
      res.end()
      return
    }

    return fn(req, res, parsedUrl)
  }
}

function setAssetPrefixByHost(fn) {
  return (req, res) => {
    if (/localhost/.test(req.headers.host)) {
      // Set the assetPrefix for localhost
      // It needs to be the http version
      app.setAssetPrefix(`http://${req.headers.host}`)
    } else {
      // Set the assetPrefix for now
      // It needs to be the https version, since now is always HTTPS
      app.setAssetPrefix(`https://${req.headers.host}`)
    }

    return fn(req, res)
  }
}

async function main(req, res, parsedUrl) {
  // Redirect to /docs as that's the main page for this zone
  if (req.url === '/') {
    // 302 as it will be cached by the browser otherwise
    res.writeHead(302, {
      Location: '/docs'
    })
    res.end()
    return
  }

  const isNext = parsedUrl.path.includes('/_next/')

  // In development we don't cache
  // When the user is logged in we don't cache
  // When the request is internal to Next.js we call handle immediately as Next.js will handle setting maxage
  if (dev || (req.headers.cookie || '').includes('token=') || isNext) {
    return handle(req, res, parsedUrl)
  }

  // s-maxage will cause Now CDN to cache the page for 1 hour (3600 seconds)
  res.setHeader('Cache-Control', `public,s-maxage=3600`)
  return handle(req, res, parsedUrl)
}

async function setup(handler) {
  // Prepare Next.js for bootup
  await app.prepare()
  // Remove ending slash
  return setAssetPrefixByHost(removeEndSlash(handler))
}

// Export a promise that micro will await before starting the server
module.exports = setup(main)
