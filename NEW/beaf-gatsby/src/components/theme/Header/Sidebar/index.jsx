import React from 'react'
import NavbarLinks from '../NavbarLinks'
import { SidebarContainer } from './styles'

export default ({ sidebar, toggle }) => (
  <SidebarContainer active={sidebar} onClick={toggle}>
    <NavbarLinks />
  </SidebarContainer>
)
