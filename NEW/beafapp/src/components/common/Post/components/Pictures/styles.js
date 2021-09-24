import styled from 'styled-components'

export const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`

export const Img = styled.div`
  overflow: hidden;
  width: 100%;
  max-width: 50%;

  .img {
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    display: block;
  }
`
