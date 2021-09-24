import React from 'react'
import 'core-js/modules/es6.set'
import 'core-js/modules/es6.map'
import 'raf/polyfill'
import ThemeProvider from 'providers/ThemeProvider'

export const onServiceWorkerUpdateReady = () => window.location.reload(true)

export const wrapRootElement = ({ element }) => (
  <ThemeProvider>{element}</ThemeProvider>
)
