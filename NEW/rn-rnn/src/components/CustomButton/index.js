import React from 'react'
import styled from 'styled-components'

export const CustomButton = ({ onPress, children }) => (
  <StyledButton onPress={onPress}>
    <CustomText>{children}</CustomText>
  </StyledButton>
)

const StyledButton = styled.TouchableOpacity`
  align-self: center;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  border-radius: 4px;
  background-color: #5282f0;
  margin-bottom: 10px;
`

const CustomText = styled.Text`
  color: #fff;
  text-align: center;
`
