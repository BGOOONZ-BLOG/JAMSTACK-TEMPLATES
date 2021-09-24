import React from 'react'
import { Footer, FooterTab, Button, Text, Icon } from 'native-base'

const CustomFooter = ({ navigate, title }) => (
	<Footer>
		<FooterTab>
			<Button vertical active={title === 'Login'} onPress={() => navigate('Login')}>
				<Icon name="person" active={title === 'Login'} />
				<Text>Login</Text>
			</Button>
			<Button vertical active={title === 'Home'} onPress={() => navigate('Home')}>
				<Icon name="navigate" active={title === 'Home'} />
				<Text>Home</Text>
			</Button>
			<Button vertical active={title === 'Register'} onPress={() => navigate('Register')}>
				<Icon name="person" active={title === 'Register'}  />
				<Text>Register</Text>
			</Button>
		</FooterTab>
	</Footer>
)

export { CustomFooter }
