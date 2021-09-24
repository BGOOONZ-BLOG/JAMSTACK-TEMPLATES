import { Navigation } from 'react-native-navigation'
import SignInIcon from 'src/assets/signin.png'
import SignUpIcon from 'src/assets/signup.png'

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      bottomTabs: {
        id: 'BottomTabsId',
        children: [
          {
            component: {
              name: 'SignIn',
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: 'Sign In',
                  icon: SignInIcon,
                },
              },
            },
          },
          {
            component: {
              name: 'SignUp',
              options: {
                bottomTab: {
                  text: 'Sign Up',
                  fontSize: 12,
                  icon: SignUpIcon,
                },
              },
            },
          },
        ],
      },
    },
  })

export const goHome = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Home',
            },
          },
        ],
      },
    },
  })
