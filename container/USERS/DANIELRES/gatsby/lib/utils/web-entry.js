/* @flow weak */
import React from 'react'
import ReactDOM from 'react-dom'
import { applyRouterMiddleware, browserHistory, Router } from 'react-router'
import useScroll from 'react-router-scroll/lib/useScroll'
import createRoutes from 'create-routes'
import { onRouteChange, onRouteUpdate, modifyRoutes, shouldUpdateScroll, replaceDOMRenderer, wrapRootComponent } from 'gatsby-browser'

const loadContext = require('.gatsby-context')

function loadConfig (cb) {
  const stuff = require('config')

  if (module.hot) {
    module.hot.accept(stuff.id, () => cb())
  }
  return cb()
}

let currentLocation = null

browserHistory.listen((location) => {
  currentLocation = location
  if (onRouteChange) {
    console.warn('onRouteChange is now deprecated and will be removed in the next major Gatsby release (0.13). Please use onRouteUpdate instead. See the PR for more info (https://github.com/gatsbyjs/gatsby/pull/321).')
    onRouteChange(location)
  }
})

function onUpdate () {
  if (onRouteUpdate) {
    onRouteUpdate(currentLocation)
  }
}

function defaultShouldUpdateScroll (prevRouterProps, nextRouterProps) {
  if (shouldUpdateScroll) {
    return shouldUpdateScroll(prevRouterProps, nextRouterProps)
  }
  if (prevRouterProps) {
    const { location: { pathname: oldPathname } } = prevRouterProps
    const { location: { pathname } } = nextRouterProps
    if (oldPathname === pathname) {
      return false
    }
  }
  return true
}

let routes
loadConfig(() =>
  loadContext((pagesReq) => {
    const { pages } = require('config')

    if (!routes) {
      routes = createRoutes(pages, pagesReq)
    } else {
      createRoutes(pages, pagesReq)
    }

    if (modifyRoutes) {
      routes = modifyRoutes(routes)
    }

    let Root = () => (
      <Router
        history={browserHistory}
        routes={routes}
        render={applyRouterMiddleware(useScroll(defaultShouldUpdateScroll))}
        onUpdate={onUpdate}
      />
    )

    if (wrapRootComponent) {
      Root = wrapRootComponent(Root)
    }

    if (replaceDOMRenderer) {
      replaceDOMRenderer({ routes, defaultShouldUpdateScroll, onUpdate })
    } else {
      ReactDOM.render(<Root />, typeof window !== 'undefined' ? document.getElementById('react-mount') : undefined)
    }
  }),
)
