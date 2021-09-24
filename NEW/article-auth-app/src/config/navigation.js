import { Navigation } from 'react-native-navigation'

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Auth',
        children: [
          {
            component: {
              name: 'Login',
              options: {
                topBar: {
                  title: {
                    text: 'Login',
                    alignment: 'center',
                  },
                },
              },
            },
          },
        ],
      },
    },
  })

export const goToRegister = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Register',
        children: [
          {
            component: {
              name: 'Register',
              options: {
                topBar: {
                  title: {
                    text: 'Sign Up',
                    alignment: 'center',
                  },
                },
              },
            },
          },
        ],
      },
    },
  })

export const goHome = token =>
  Navigation.setRoot({
    root: {
      stack: {
        id: 'App',
        children: [
          {
            component: {
              name: 'Home',
              passProps: {
                token,
              },
              options: {
                topBar: {
                  visible: false,
                },
              },
            },
          },
        ],
      },
    },
  })
