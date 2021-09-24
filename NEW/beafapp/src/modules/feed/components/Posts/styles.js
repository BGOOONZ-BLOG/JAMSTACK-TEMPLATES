import styled from 'styled-components'

export const Wrapper = styled.div`
  width: 100%;
  max-width: 68%;

  @media (max-width: 960px) {
    max-width: 90%;
    margin: 0 auto;
  }
`

export const Content = styled.div`
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 960px) {
    text-align: center;
  }
`

export const Center = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`
