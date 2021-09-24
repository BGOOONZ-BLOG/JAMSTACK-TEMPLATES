import React from 'react'
import { Container } from 'native-base'
import { CustomHeader, CustomFooter } from '../../common'

const Layout = ({ navigation, title, screen, children, back }) => (
	<Container>
		<CustomHeader title={title} back={back} goBack={navigation.goBack} />
		{children}
		<CustomFooter title={screen} navigate={navigation.navigate} />
	</Container>
)

export { Layout }
