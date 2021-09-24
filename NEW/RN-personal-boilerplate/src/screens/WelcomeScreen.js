import React, { Component } from 'react'
import Start from '../modules/theme/Start'

class WelcomeScreen extends Component {
	static navigationOptions = {
		header: null
	}

	render() {
		const { navigation } = this.props
		return (
			<Start navigation={navigation} />
		)
	}
}

export default WelcomeScreen
