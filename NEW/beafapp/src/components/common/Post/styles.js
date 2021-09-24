import styled from 'styled-components'

export const Wrapper = styled.div`
  border-radius: 5px;
  box-shadow: 0 1px 10px 0 rgba(5, 5, 5, 0.13);
  margin-bottom: 4rem;
  background: #fff;
  overflow: hidden;

  ${({ flex }) =>
    flex &&
    `
    width: 100%;
    max-width: 48%;

    @media (max-width: 960px) {
      max-width: 100%;
    }
  `}
`

export const UnbiasedBadge = styled.div`
  max-width: 100%;
  padding: 0.6rem 1rem;
  box-sizing: border-box;
`

export const Badge = styled.span`
  background: rgb(24, 23, 71);
  padding: 0.3rem 1rem;
  border-radius: 40px;
  color: #fff;
`
