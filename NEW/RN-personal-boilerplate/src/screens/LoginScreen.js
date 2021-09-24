import React, { Component } from 'react'
import { Layout } from '../modules/common'
import Login from '../modules/auth/Login'

class LoginScreen extends Component {
	static navigationOptions = {
		header: null
	}

	render() {
		const { navigation } = this.props
		return (
			<Layout title="Login" screen="Login" back navigation={navigation}>
				<Login navigate={navigation.navigate} />
			</Layout>
		)
	}
}

export default LoginScreen
