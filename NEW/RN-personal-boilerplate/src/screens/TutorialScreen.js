import React, { Component } from 'react'
import Swipe from '../modules/Swipe'

class TutorialScreen extends Component {
	static navigationOptions = {
		header: null
	}

	render() {
		const { navigation } = this.props
		return (
			<Swipe navigation={navigation} />
		)
	}
}

export default TutorialScreen
