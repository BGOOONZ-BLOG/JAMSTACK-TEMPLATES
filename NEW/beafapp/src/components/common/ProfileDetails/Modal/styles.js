import styled from 'styled-components'

export const Wrapper = styled.div`
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 3;
`

export const Overlay = styled.div`
  max-width: 400px;
  background: #fff;
  border-radius: 3px;
  align-self: center;
  z-index: 1;
  position: relative;

  @media (max-width: 500px) {
    max-width: 90%;
    box-sizing: border-box;
  }
`

export const SubOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Card = styled.div`
  padding: 1rem;
`

export const Content = styled.div`
  padding: 1rem;
`

export const Scrollable = styled.div`
  overflow-y: scroll;
  max-height: 200px;

  &::-webkit-scrollbar {
    background-color: #edf0f5;
    width: 6px;
    border-radius: 16px;
    &:hover {
      background-color: #edf0f5;
    }
  }
  &::-webkit-scrollbar-thumb {
    background-color: #212121;
    border-radius: 16px;
    &:hover {
      background-color: lighten(#212121, 20);
    }
  }
`
