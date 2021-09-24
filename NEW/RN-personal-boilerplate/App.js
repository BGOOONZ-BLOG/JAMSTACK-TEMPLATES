import React from 'react'
import { Provider } from 'react-redux'
import { Platform } from 'react-native'
import AppStackNavigator from './src/config/routes'
import store from './src/config/store'

Platform.select({ android: () => require('intl'), ios: () => {} })()

const Home = () => (
	<Provider store={store}>
		<AppStackNavigator />
	</Provider>
)

export default Home
