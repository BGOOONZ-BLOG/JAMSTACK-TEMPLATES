import styled from 'styled-components'

export const Container = styled.div`
  max-width: 1280px;
  width: 100%;
  margin: 0 auto;

  @media (max-width: 1400px) {
    width: 90%;
  }

  ${({ vertical }) =>
    vertical &&
    `
			height: 100vh;
			display: flex;
			justify-content: center;
	`}
`
