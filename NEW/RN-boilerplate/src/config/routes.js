import { createStackNavigator } from 'react-navigation'
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const AppStackNavigator = createStackNavigator({
	Home: WelcomeScreen,
	Login: LoginScreen,
	Register: RegisterScreen
})

export default AppStackNavigator
