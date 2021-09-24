import React from 'react'
import {
  Overlay,
  Wrapper,
  Content,
  Actions,
  Message,
  SubOverlay,
} from './styles'
import { Button } from '../../common'

export const Modal = ({ title, description, action, onPress, cancel }) => (
  <Overlay>
    <SubOverlay onClick={cancel} />
    <Wrapper>
      <Content>
        <Message>
          <p>{title}</p>
          {description && <p>{description}</p>}
        </Message>
        <Actions>
          <Button type="button" onClick={onPress} confirm>
            {action}
          </Button>
          <Button type="button" onClick={cancel} cancel>
            Cancel
          </Button>
        </Actions>
      </Content>
    </Wrapper>
  </Overlay>
)
