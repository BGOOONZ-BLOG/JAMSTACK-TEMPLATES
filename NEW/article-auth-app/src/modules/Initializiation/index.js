import React, { useContext } from 'react'
import { View, Text } from 'react-native'
import { Context } from 'src/providers/UserProvider'
import useGetUser from 'src/hooks/useGetUser'
import Container from 'src/components/Container'
import CustomButton from 'src/components/CustomButton'
import { goToAuth, goHome, goToRegister } from 'src/config/navigation'

export default () => {
  const { user, dispatch } = useContext(Context)
  const { loading, isLoggedIn } = useGetUser(user, dispatch)

  return (
    <Container flex>
      {loading ? (
        <Text>Loading</Text>
      ) : isLoggedIn ? (
        <View>
          <Text style={{ textAlign: 'center', marginBottom: 30 }}>
            Welcome back {user.data.user.username}!
          </Text>
          <CustomButton onPress={() => goHome(user.data.token)}>
            Go Home
          </CustomButton>
        </View>
      ) : (
        <View>
          <Text style={{ textAlign: 'center', marginBottom: 30 }}>
            Welcome!
          </Text>
          <CustomButton onPress={() => goToRegister()}>Register</CustomButton>
          <CustomButton onPress={() => goToAuth()}>Sign In</CustomButton>
        </View>
      )}
    </Container>
  )
}
