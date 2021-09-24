import React from 'react'
import { connect } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'
import { branch, renderComponent, compose } from 'recompose'
import { Loader } from '../modules/common'

const Public = ({ auth, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props => (auth.isLoggedIn ? (
			<Redirect to="/profile" />
		) : (
			<Component {...props} />
		))
		}
	/>
)

const mapStateToProps = state => ({
	auth: state.auth
})

const enhance = compose(
	connect(mapStateToProps),
	branch(
		props => props.auth.loading === undefined || props.auth.loading,
		renderComponent(Loader)
	)
)

export default enhance(Public)
