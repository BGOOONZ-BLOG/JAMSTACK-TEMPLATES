import React from 'react'
import { Footer, Title, Tab } from './styles'

const CustomFooter = ({ navigate, title }) => (
	<Footer>
		<Tab onPress={() => navigate('Login')} active={title === 'Login'}>
			<Title>Login</Title>
		</Tab>
		<Tab onPress={() => navigate('Home')} active={title === 'Home'}>
			<Title>Home</Title>
		</Tab>
		<Tab onPress={() => navigate('Register')} active={title === 'Register'}>
			<Title>Register</Title>
		</Tab>
	</Footer>
)

export default CustomFooter
