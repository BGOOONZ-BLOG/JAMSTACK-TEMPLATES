import styled from 'styled-components'

export const StyledHeader = styled.div`
  background: #fff;
  width: 100%;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
	position: relative;
	z-index: 2;
`

export const Overlay = styled.div`
  position: fixed;
  background: rgba(0, 0, 0, 0.7);
  width: 100%;
  height: 100%;
  display: none;
  transition: 0.4s;

  ${({ sidebar }) =>
    sidebar &&
    `
		display: block;
		z-index: 4;	
	`}
`
