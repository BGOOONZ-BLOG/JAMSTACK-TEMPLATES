import { createStackNavigator } from 'react-navigation'
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import ProfileScreen from '../screens/ProfileScreen'
import TutorialScreen from '../screens/TutorialScreen'
import AuthScreen from '../screens/AuthScreen'

const AppStackNavigator = createStackNavigator({
	Home: WelcomeScreen,
	Login: LoginScreen,
	Register: RegisterScreen,
	Tutorial: TutorialScreen,
	Auth: AuthScreen,
	Profile: ProfileScreen
})

export default AppStackNavigator
