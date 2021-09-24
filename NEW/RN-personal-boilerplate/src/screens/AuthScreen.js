import React, { Component } from 'react'
import { Layout } from '../modules/common'
import AuthRoutes from '../modules/auth/AuthRoutes'

class AuthScreen extends Component {
	static navigationOptions = {
		header: null
	}

	render() {
    	const { navigation } = this.props
    	return (
    		<Layout title="Auth" screen="Auth" navigation={navigation}>
				<AuthRoutes navigate={navigation.navigate} />
    		</Layout>
    	)
	}
}

export default AuthScreen
