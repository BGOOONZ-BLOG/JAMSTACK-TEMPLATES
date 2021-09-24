import React from 'react'
import { compose, withStateHandlers } from 'recompose'
import { Content, Form, Item, Input, Label, Container, Button, Text } from 'native-base'
import styles from './styles'

const Login = ({ save, email, password, handleChange }) => {
	const { btn, marginBottom, wrapper } = styles
	return (
		<Container>
			<Content contentContainerStyle={{ flex: 1, justifyContent: 'center' }}>
				<Text>{email}</Text>
				<Text>{password}</Text>
				<Form style={wrapper}>
					<Item floatingLabel>
						<Label>Username</Label>
						<Input autoCorrect={false} onChangeText={(email) => handleChange('email', email)} value={email} />
					</Item>
					<Item floatingLabel last style={marginBottom}>
						<Label>Password</Label>
						<Input autoCorrect={false} onChangeText={(password) => handleChange('password', password)} value={password} secureTextEntry />
					</Item>
					<Button primary style={btn} onPress={save}>
						<Text>Login</Text>
					</Button>
				</Form>
			</Content>
		</Container>
	)
}

const enhance = compose(
	withStateHandlers(
		() => ({
			email: '',
			password: '',
			showData: false
		}),
		{
			handleChange: () => (name, value) => ({ [name]: value }),
			save: ({ email, password }) => () => alert(email, password)
		}
	)
)

export default enhance(Login)
