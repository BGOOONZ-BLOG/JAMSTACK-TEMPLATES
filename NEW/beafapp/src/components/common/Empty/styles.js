import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 1rem 0;

  ${({ profile }) =>
    !profile &&
    `
    width: 100%;
    max-width: 68%;

    @media (max-width: 960px) {
      max-width: 90%;
      margin: 0 auto;
    }
  `}
`

export const Content = styled.div`
  text-align: center;
  padding: 1rem;

  h2 {
    font-size: 24pt;
  }

  h4 {
    margin-bottom: 2rem;
    color: #90949c;
    font-weight: normal;
  }

  img {
    width: 100%;
  }
`

export const Center = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`
