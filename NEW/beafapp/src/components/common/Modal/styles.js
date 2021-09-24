import styled from 'styled-components'

export const Overlay = styled.div`
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  z-index: 9999;
`

export const Wrapper = styled.div`
  max-width: 960px;
  width: 50%;
  margin: 0 auto;
  align-self: center;

  @media (max-width: 980px) {
    width: 90%;
  }
`

export const SubOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`

export const Content = styled.div`
  padding: 0.5rem;
  background: #fff;
  z-index: 1;
  position: relative;
`

export const Actions = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem 0;
  border-top: 1px solid #eee;
  flex-direction: row-reverse;

  button:first-child {
    margin-left: 1rem;
  }
`

export const Message = styled.div`
  padding: 2rem 1rem;
  text-align: left;

  p {
    color: #888787;
  }
`
