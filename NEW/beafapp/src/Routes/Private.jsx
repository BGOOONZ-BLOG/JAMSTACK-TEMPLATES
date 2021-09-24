import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { compose, branch, renderComponent } from 'recompose'
import { Loading } from '../components/common'

const Private = ({ auth, component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      auth.isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
)

const mapStateToProps = ({ auth }) => ({
  auth,
})

const enhance = compose(
  connect(mapStateToProps),
  branch(
    ({ auth }) => auth.loading === undefined || auth.loading,
    renderComponent(Loading)
  )
)

export default enhance(Private)
