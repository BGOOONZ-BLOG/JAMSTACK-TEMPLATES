import React from 'react'
import { Link } from 'react-router-dom'
import EmptyImg from './empty.svg'
import { Button } from '../../common'
import { Wrapper, Content, Center } from './styles'

export const Empty = ({ profile, follow, publicProfile }) => (
  <Wrapper profile={profile}>
    <Content>
      <h2>
        {!publicProfile
          ? 'Welcome to Beaf!'
          : `This user hasn't posted anything yet!`}
      </h2>
      {!publicProfile && (
        <h4>{`Get started by ${
          follow
            ? 'following friends or adding a new post'
            : 'adding a new post'
        }. You'll see ${follow ? 'their' : 'your'} photos and posts here${
          follow ? ', including yours.' : '.'
        }`}</h4>
      )}
      {!publicProfile && (
        <Center>
          <Button as={Link} to="/add-post">
            ADD A NEW POST
          </Button>
        </Center>
      )}
      <img src={EmptyImg} alt="empty" />
    </Content>
  </Wrapper>
)
