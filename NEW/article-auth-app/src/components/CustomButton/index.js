import React from 'react'
import styled from 'styled-components'

export default ({ onPress, children }) => (
  <StyledButton onPress={onPress}>
    <CustomText>{children}</CustomText>
  </StyledButton>
)

const StyledButton = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 15px 30px;
  border-radius: 4px;
  background-color: #8aa55e;
  margin-bottom: 10px;
  font-size: 16px;
  font-weight: 800;
`

const CustomText = styled.Text`
  color: #fff;
  text-align: center;
`
