import React from 'react'
import randomCombo from 'random-a11y-combo'

import { css } from './constants'

const boxStyles = {
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  fontSize: '40px',
  fontFamily: 'sans-serif',
  padding: '20px'
}

const textStyles = {
  maxWidth: '24em'
}

export const Layout = ({ children }) => {
  const [backgroundColor, color] = randomCombo()
  const style = Object.assign({}, boxStyles, {
    backgroundColor,
    color
  })

  return (
    <div style={style}>
      <title>Lots of things</title>
      <style children={css} />

      <div style={textStyles}>{children}</div>
    </div>
  )
}
