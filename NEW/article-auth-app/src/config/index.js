import { Navigation } from 'react-native-navigation'
import Initializing from 'src/screens/Initializing'
import Home from 'src/screens/Home'
import Login from 'src/screens/Login'
import Register from 'src/screens/Register'

export const BASE_URL = 'http://localhost:5000/api'
export const REACT_APP = 'http://localhost:3000'

export const registerScreens = () => {
  Navigation.registerComponent('Home', () => Home)
  Navigation.registerComponent('Initializing', () => Initializing)
  Navigation.registerComponent('Login', () => Login)
  Navigation.registerComponent('Register', () => Register)
}
