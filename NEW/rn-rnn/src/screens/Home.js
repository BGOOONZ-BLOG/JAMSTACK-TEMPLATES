import React from 'react'
import { Text, AsyncStorage } from 'react-native'
import { goToAuth } from 'src/core/navigation'
import { Navigation } from 'react-native-navigation'
import { USER_KEY } from 'src/config'
import { CustomButton, Container } from 'src/components'

const Home = ({ componentId }) => {
  const logout = async () => {
    try {
      await AsyncStorage.removeItem(USER_KEY)
      goToAuth()
    } catch (err) {
      console.log('error signing out...: ', err)
    }
  }
  return (
    <Container>
      <Text>Hello from Home screen.</Text>
      <CustomButton onPress={logout}>Sign Out</CustomButton>
      <CustomButton
        onPress={() => {
          Navigation.push(componentId, {
            component: {
              name: 'Screen2',
            },
          })
        }}
      >
        Next screen
      </CustomButton>
    </Container>
  )
}

Home.options = {
  topBar: {
    title: {
      text: 'Home',
    },
  },
}

export default Home
