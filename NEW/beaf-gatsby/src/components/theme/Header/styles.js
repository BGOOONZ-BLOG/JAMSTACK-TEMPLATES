import styled from 'styled-components';

export const StyledHeader = styled.div`
  background: #fff;
  width: 100%;
  z-index: 1;
  border-bottom: 0.01em solid rgb(204, 204, 204);
  border-top: 5px solid #3f46ad;
  margin-bottom: -3rem;
`;

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
`;
