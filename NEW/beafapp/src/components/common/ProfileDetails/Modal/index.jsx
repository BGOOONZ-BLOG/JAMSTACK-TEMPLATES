import React from 'react'
import { Container, SingleUser, CancelMark } from '../../../common'
import {
  Wrapper,
  Overlay,
  Content,
  SubOverlay,
  Scrollable,
  Card,
} from './styles'

export default ({ toggleModal, contentTitle, content, myId, history }) => (
  <Wrapper>
    <SubOverlay onClick={() => toggleModal(false)} />
    <Overlay as={Container}>
      <Card>
        <CancelMark
          toggle={() => toggleModal(false)}
          alt="close modal"
          align="right"
        />
        <h2>{contentTitle}</h2>
        <Scrollable>
          <Content>
            {content &&
              content.map(content => (
                <SingleUser
                  key={content._id}
                  {...content}
                  myId={myId}
                  toggleModal={toggleModal}
                  history={history}
                  modal
                />
              ))}
          </Content>
        </Scrollable>
      </Card>
    </Overlay>
  </Wrapper>
)
