import React, { Component } from 'react'
import { Content, Container, Text } from 'native-base'
import { Layout } from '../modules/common'

class WelcomeScreen extends Component {
	static navigationOptions = {
		header: null
	}

	render() {
		const { navigation } = this.props
		return (
			<Layout title="Boilerplate" screen="Home" navigation={navigation}>
				<Container>
					<Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
						<Text style={{ textAlign: 'center' }}>Welcome!</Text>
					</Content>
				</Container>
			</Layout>
		)
	}
}

export default WelcomeScreen
