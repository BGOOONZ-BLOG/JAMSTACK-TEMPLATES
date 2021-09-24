import React from 'react'
import { Wrapper, Bar } from './styles'

export default ({ sidebar, toggle, auth }) => (
  <Wrapper
    sidebar={sidebar}
    onClick={toggle}
    banner={auth && auth.isLoggedIn && !auth.user.hasEmailVerified}
  >
    <Bar top sidebar={sidebar} />
    <Bar mid sidebar={sidebar} />
    <Bar bottom sidebar={sidebar} />
  </Wrapper>
)
