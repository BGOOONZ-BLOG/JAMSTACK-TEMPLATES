import { Navigation } from 'react-native-navigation'
import { registerScreens } from './src/config'

registerScreens()

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      component: {
        name: 'Initializing',
      },
    },
  })
})
