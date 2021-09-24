import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import { compose, withStateHandlers, branch, renderNothing } from 'recompose'
import Navbar from './Navbar'
import Hamburger from './Hamburger'
import Sidebar from './Sidebar'
import { StyledHeader, Overlay } from './styles'
import { logout } from '../../modules/auth/actions'

const Header = ({
  sidebar,
  toggle,
  logout,
  auth,
  history,
  resendEmail,
  banner,
}) => (
  <StyledHeader>
    <Overlay sidebar={sidebar} onClick={toggle} />
    <Navbar
      resendEmail={resendEmail}
      banner={banner}
      history={history}
      auth={auth}
      logout={logout}
    />
    <Hamburger sidebar={sidebar} auth={auth} toggle={toggle} />
    <Sidebar
      history={history}
      auth={auth}
      logout={logout}
      sidebar={sidebar}
      toggle={toggle}
    />
  </StyledHeader>
)

const mapStateToProps = ({ auth }) => ({
  auth,
})

const enhance = compose(
  connect(
    mapStateToProps,
    { logout },
    null,
    { pure: false }
  ),
  withStateHandlers(
    () => ({
      sidebar: false,
      isHomePage: false,
      banner: true,
    }),
    {
      toggle: ({ sidebar }) => () => ({ sidebar: !sidebar }),
      setHomePage: ({ isHomePage }) => () => ({ isHomePage: !isHomePage }),
      resendEmail: ({ banner }) => async () => {
        await axios.post(
          `${process.env.REACT_APP_PROD_API}/api/user/resend/email`
        )
        await toast.success('Email has been sent! Please check your inbox', {
          position: toast.POSITION.TOP_CENTER,
        })

        return {
          banner: !banner,
        }
      },
    }
  ),
  branch(({ auth }) => !auth || auth.loading, renderNothing)
)

export default enhance(Header)
