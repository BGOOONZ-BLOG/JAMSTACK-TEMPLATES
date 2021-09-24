import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 1rem 0;
`

export const Center = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`

export const Flex = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &:after {
    content: '';
    width: 100%;
    max-width: 48%;
  }
`
