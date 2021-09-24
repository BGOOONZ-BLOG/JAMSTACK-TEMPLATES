import React from 'react'
import Swappable from './Swappable'
import { Layout, CustomButton } from '../common'
import { Wrapper } from './styles'

const Swipe = ({ navigation }) => (
	<Layout title="Tutorial" screen="Tutorial" navigation={navigation}>
		<Wrapper>
			<CustomButton onPress={() => navigation.navigate('Auth')} text="skip" link />
			<Swappable navigate={navigation.navigate} />
		</Wrapper>
	</Layout>
)

export default Swipe
