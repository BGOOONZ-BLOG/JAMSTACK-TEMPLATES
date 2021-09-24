import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 28%;
  align-self: flex-start;

  @media (max-width: 960px) {
    display: none;
  }
`

export const Fixed = styled.div`
  position: fixed;
  width: 100%;
  max-width: 255px;

  p {
    color: #bbbaba;
  }
`

export const Block = styled.div`
  background: #fff;
  padding: 0.5rem;
`
