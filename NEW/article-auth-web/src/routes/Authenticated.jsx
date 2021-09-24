import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from 'helpers/history'
import Dashboard from 'modules/dashboard/Dashboard'
import Header from 'components/theme/Header'

export default ({ isLoggedIn, dispatch }) => (
  <Router history={history}>
    <Header isLoggedIn dispatch={dispatch} />
    <Switch>
      <Route path="/" exact component={Dashboard} />
    </Switch>
  </Router>
)
