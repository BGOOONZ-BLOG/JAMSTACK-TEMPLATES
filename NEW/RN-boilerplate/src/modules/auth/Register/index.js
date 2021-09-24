import React from 'react'
import { Content, Form, Item, Input, Label, Container, Button, Text } from 'native-base'
import styles from './styles'

const Register = () => {
	const { btn, marginBottom, wrapper } = styles
	return (
		<Container>
			<Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
				<Form style={wrapper}>
					<Item floatingLabel>
						<Label>Username</Label>
						<Input autoCorrect={false} />
					</Item>
					<Item floatingLabel>
						<Label>Email</Label>
						<Input autoCorrect={false} />
					</Item>
					<Item floatingLabel last style={marginBottom}>
						<Label>Password</Label>
						<Input autoCorrect={false} secureTextEntry />
					</Item>
					<Button primary style={btn} onPress={() => alert('hey')}>
						<Text>Register</Text>
					</Button>
				</Form>
			</Content>
		</Container>
	)
}

export default Register
