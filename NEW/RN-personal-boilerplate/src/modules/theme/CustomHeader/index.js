import React from 'react'
import { View } from 'react-native'
import { Header, Title, Back } from './styles'

const CustomHeader = ({ title, back, goBack }) => (
	<Header back={back}>
		<View>
			{back && (
				<Back onPress={() => goBack()}>
					<Title>Back</Title>
				</Back>
			)}
		</View>
		<View>
			<Title>{title}</Title>
		</View>
	</Header>
)

export default CustomHeader
