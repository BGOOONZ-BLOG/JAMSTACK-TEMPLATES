import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import store from './store'
import Private from './Routes/Private'
import Public from './Routes/Public'
import { verifyToken } from './modules/auth/actions'

import Login from './modules/auth/Login'
import Register from './modules/auth/Register'
import Dashboard from './modules/dashboard/containers/Dashboard'
import Profile from './modules/profile/Profile'
import EditProfile from './modules/profile/EditProfile'
import addTrashcanContainer from './modules/dashboard/containers/addTrashcanContainer'
import editTrashcanContainer from './modules/dashboard/containers/editTrashcanContainer'
import DashboardNotification from './modules/dashboard/containers/DashboardNotification'
// No time to work on worker management as well
/* import AddWorker from './modules/workers/containers/AddWorker'
import EditWorker from './modules/workers/containers/EditWorker' */
import { NotFound } from './modules/common'
import './main.scss'

export const history = createHistory()

try {
	if (localStorage.jwtToken) {
		store.dispatch(verifyToken(localStorage.jwtToken))
	}
} catch (e) {
	if (history.location.pathname !== '/') {
		history.push('/')
	}
}

const AppRoutes = () => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Public path="/" exact component={Login} />
				<Public path="/register" exact component={Register} />
				<Private path="/dashboard" exact component={Dashboard} />
				<Private path="/profile" exact component={Profile} />
				<Private path="/edit-profile" exact component={EditProfile} />
				<Private path="/add-trashcan" exact component={addTrashcanContainer} />
				<Private path="/edit-trashcan/:id" exact component={editTrashcanContainer} />
				<Private path="/dashboard/:id" exact component={DashboardNotification} />
				{/* No time to work on worker management as well */}
				{/* <Private path="/add-worker" component={AddWorker} />
				<Private path="/edit-worker/:id" component={EditWorker} /> */}
				<Public component={NotFound} />
			</Switch>
		</Router>
	</Provider>
)

export default AppRoutes
