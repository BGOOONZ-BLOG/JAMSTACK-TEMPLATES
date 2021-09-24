import { Navigation } from 'react-native-navigation'
import Home from 'src/screens/Home'
import Initializing from 'src/screens/Initializing'
import SignIn from 'src/screens/SignIn'
import SignUp from 'src/screens/SignUp'
import Screen2 from 'src/screens/Screen2'

export const USER_KEY = 'test'

export const registerScreens = () => {
  Navigation.registerComponent('Home', () => Home)
  Navigation.registerComponent('Initializing', () => Initializing)
  Navigation.registerComponent('SignIn', () => SignIn)
  Navigation.registerComponent('SignUp', () => SignUp)
  Navigation.registerComponent('Screen2', () => Screen2)
}
