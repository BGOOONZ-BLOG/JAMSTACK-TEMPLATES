import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AsyncStorage } from 'react-native'
import { goToAuth, goHome } from 'src/core/navigation'
import { Container } from 'src/components'
import { USER_KEY } from 'src/config'

export default () => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await AsyncStorage.getItem(USER_KEY)
        console.log('user: ', user)
        if (user) {
          goHome()
        } else {
          goToAuth()
        }
      } catch (err) {
        console.log('error: ', err)
        goToAuth()
      }
    }

    fetchUser()
  }, [])

  return (
    <Container>
      <Text>Loading</Text>
    </Container>
  )
}

const Text = styled.Text`
  font-size: 28px;
`
