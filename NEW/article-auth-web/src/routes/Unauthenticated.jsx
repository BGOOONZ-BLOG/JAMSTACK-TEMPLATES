import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from 'helpers/history'
import Login from 'modules/auth/Login'
import Register from 'modules/auth/Register'
import Header from 'components/theme/Header'

export default () => (
  <Router history={history}>
    <Header />
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/register" component={Register} />
    </Switch>
  </Router>
)
