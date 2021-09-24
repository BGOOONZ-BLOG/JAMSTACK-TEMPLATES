import React from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import Apollo from 'providers/Apollo'
import history from 'helpers/history'
import Home from 'modules/home/Home'
import Repository from 'modules/repo/Repository'

export default () => (
  <Apollo>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/repo/:name" component={Repository} />
      </Switch>
    </Router>
  </Apollo>
)
