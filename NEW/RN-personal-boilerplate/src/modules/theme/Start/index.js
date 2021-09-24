import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { View } from 'react-native'
import { compose, withStateHandlers } from 'recompose'
import { CustomButton, Title, Layout } from '../../common'
import { handleLanguage } from '../actions'

const Start = ({ navigation, changeLanguage }) => (
	<Layout title="Boilerplate" screen="Home" navigation={navigation}>
		<Intro>
			<Title id="welcome" position="center" />
		</Intro>
		<View>
			<CustomButton
				onPress={() => changeLanguage('en', navigation)}
				marginBottom={20}
				text="english"
			/>
			<CustomButton
				onPress={() => changeLanguage('ar', navigation)}
				text="arabic"
				secondary
			/>
		</View>
	</Layout>
)

const Intro = styled.View`
	margin-bottom: 20px;
`

const enhance = compose(
	connect(null, { handleLanguage }),
	withStateHandlers(
		() => ({
			language: 'en'
		}),
		{
			changeLanguage: (state, props) => (value, navigation) => {
				props.handleLanguage(value)
				navigation.navigate('Tutorial')
			}
		}
	)
)

export default enhance(Start)
