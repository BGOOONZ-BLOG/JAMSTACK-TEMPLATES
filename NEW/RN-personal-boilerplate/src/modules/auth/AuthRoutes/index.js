import React from 'react'
import { CustomButton, Title } from '../../common'
import { Icon, Item, Thumbnail, Wrapper, Top } from './styles'
import firstImage from '../../../assets/agree.png'

const AuthRoutes = ({ navigate }) => (
	<Wrapper>
		<Top>
			<CustomButton onPress={() => navigate('Login')} text="arabic" link />
		</Top>
		<Item>
			<Thumbnail>
				<Icon source={firstImage} />
			</Thumbnail>
			<Title id="intro" position="center" marginBottom={10} subtitle />
			<CustomButton onPress={() => navigate('Register')} text="signup" marginBottom={20} />
			<CustomButton onPress={() => navigate('Login')} secondary text="login" />
		</Item>
	</Wrapper>
)

export default AuthRoutes
