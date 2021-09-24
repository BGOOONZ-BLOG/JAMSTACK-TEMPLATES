import styled from 'styled-components'

export const Wrapper = styled.div`
  ${({ flex }) =>
    flex &&
    `
		flex: 1 auto;
		width: 100%;
		max-width: 10%;
	`}
  width: 100%;
  ${({ align }) =>
    align &&
    `
		text-align: ${align};
	`}
`

export const CancelBtn = styled.button`
  border-radius: 50%;
  background: none;
  border: none;
  cursor: pointer;
`
