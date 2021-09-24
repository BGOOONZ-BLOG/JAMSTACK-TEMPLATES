import styled from 'styled-components'

const Item = styled.div`
  width: 100%;
  max-width: ${({ width }) => width}%;
  text-align: left;

  img {
    width: 100%;
  }

  @media (max-width: 960px) {
    max-width: 100%;
  }
`

export default Item