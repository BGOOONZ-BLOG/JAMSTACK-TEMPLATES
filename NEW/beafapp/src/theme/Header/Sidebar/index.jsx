import React from 'react'
import NavbarLinks from '../NavbarLinks'
import { SidebarContainer } from './styles'

const Sidebar = ({ sidebar, toggle, logout, auth, history }) => (
  <SidebarContainer active={sidebar} onClick={toggle}>
    <NavbarLinks history={history} auth={auth} logout={logout} />
  </SidebarContainer>
)

export default Sidebar
