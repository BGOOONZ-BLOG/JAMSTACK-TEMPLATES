import React from 'react'
import { Button } from '../../../../components/common'
import { Wrapper, Content, Center } from './styles'

const User = ({ user }) => (
  <Wrapper>
    <Content>
      <h2>{`${user.firstName} ${user.lastName}`}</h2>
      <p>@{user.username}</p>
      <Center>
        <Button type="button">Edit</Button>
      </Center>
    </Content>
  </Wrapper>
)

export default User
