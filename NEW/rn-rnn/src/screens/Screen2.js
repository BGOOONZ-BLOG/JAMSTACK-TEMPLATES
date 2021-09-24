import React from 'react'
import { Text } from 'react-native'
import { Navigation } from 'react-native-navigation'
import { CustomButton, Container } from 'src/components'

const Screen2 = () => (
  <Container>
    <Text>Screen 2</Text>
    <CustomButton onPress={() => Navigation.pop(this.props.componentId)}>
      Go Back
    </CustomButton>
  </Container>
)

Screen2.options = {
  topBar: {
    title: {
      text: 'Screen 2',
    },
  },
}

export default Screen2
