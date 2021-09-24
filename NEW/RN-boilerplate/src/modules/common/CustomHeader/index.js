import React from 'react'
import { Header, Title, Button, Left, Right, Body, Icon } from 'native-base'

const CustomHeader = ({ title, back, goBack }) => (
	<Header>
		<Left>
			{back && (
				<Button onPress={() => goBack()} transparent>
					<Icon name="arrow-back" />
				</Button>
			)}
		</Left>
		<Body>
			<Title>{title}</Title>
		</Body>
		<Right />
	</Header>
)

export { CustomHeader }
