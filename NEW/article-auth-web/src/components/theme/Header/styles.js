import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 2rem 0;
`

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Links = styled.div`
  display: flex;
  align-items: center;

  a {
    text-decoration: unset;
    color: inherit;
    margin-right: 1rem;

    &:last-child {
      margin-right: unset;
    }
  }
`
