import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../../common'
import { Wrapper, Vertical } from './styles'

export const NotFound = () => (
  <Wrapper>
    <Vertical>
      <h4>404 - Page Not Found</h4>
      <Button as={Link} to="/">
        GO BACK HOME
      </Button>
    </Vertical>
  </Wrapper>
)
