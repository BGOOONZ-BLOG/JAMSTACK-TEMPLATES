import React from 'react'
import { HamburgerIcon, Bar } from './styles'

export default ({ sidebar, toggle }) => (
  <HamburgerIcon sidebar={sidebar} onClick={toggle}>
    <Bar top sidebar={sidebar} />
    <Bar mid sidebar={sidebar} />
    <Bar bottom sidebar={sidebar} />
  </HamburgerIcon>
)
