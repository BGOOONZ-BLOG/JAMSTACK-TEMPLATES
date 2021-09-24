import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Button from 'components/common/Button'
import Container from 'components/common/Container'
import { logout } from 'modules/auth/actions'
import { Wrapper, Flex, Links } from './styles'

export default ({ isLoggedIn, dispatch }) => (
  <Wrapper>
    <Flex as={Container}>
      <Link to="/">
        <h2>Logo</h2>
      </Link>
      <Links>
        {isLoggedIn ? (
          <Button type="button" onClick={() => logout(dispatch)}>
            Logout
          </Button>
        ) : (
          <>
            <NavLink activeStyle={{ color: 'blue' }} to="/login">
              Login
            </NavLink>
            <NavLink activeStyle={{ color: 'blue' }} to="/register">
              Register
            </NavLink>
          </>
        )}
      </Links>
    </Flex>
  </Wrapper>
)
