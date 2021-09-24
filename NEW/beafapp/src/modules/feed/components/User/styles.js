import styled from 'styled-components'

export const Wrapper = styled.div`
  flex: 1 auto;
  width: 100%;
  max-width: 30%;
  align-self: flex-start;

  @media (max-width: 960px) {
    max-width: 100%;
    margin-bottom: 2rem;
  }
`

export const Center = styled.div`
  text-align: center;
`

export const Content = styled.div`
  background: #fff;
  box-shadow: 3px 0 16px 0 rgba(0, 0, 0, 0.12);
  padding: 1rem;
  text-align: center;
  border-radius: 2px;
`
