import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../../../components/common'
import NavbarLinks from '../NavbarLinks'
import { Brand, Wrapper, Banner, FlatBtn } from './styles'

export default ({ logout, auth, history, resendEmail, banner }) => (
  <>
    {banner && auth && auth.isLoggedIn && !auth.user.hasEmailVerified && (
      <Banner>
        <Container>
          <span>
            Please verify your email through the link we sent you via your inbox
            (you might want to check the spam folder)
          </span>
          <FlatBtn type="button" onClick={resendEmail}>
            Resend email
          </FlatBtn>
        </Container>
      </Banner>
    )}
    <Wrapper as={Container} newUser={auth && auth.isLoggedIn ? 0 : 1}>
      <Brand as={Link} to="/">
        BE<span>AF</span>
      </Brand>
      <NavbarLinks history={history} auth={auth} logout={logout} desktop />
    </Wrapper>
  </>
)
