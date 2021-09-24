import React, { Component } from 'react'
import { Layout } from '../modules/common'
import Register from '../modules/auth/Register'

class RegisterScreen extends Component {
	static navigationOptions = {
		header: null
	}

	render() {
		const { navigation } = this.props
		return (
			<Layout title="Register" screen="Register" back navigation={navigation}>
				<Register />
			</Layout>
		)
	}
}

export default RegisterScreen
