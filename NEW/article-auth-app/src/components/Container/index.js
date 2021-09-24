import styled from 'styled-components'

const Container = styled.View`
  flex: 1;

  ${({ flex }) =>
    flex &&
    `
    display: flex;
    align-items: center;
    justify-content: center;
  `}
`

export default Container
