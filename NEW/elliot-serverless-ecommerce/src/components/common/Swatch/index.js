import styled from "styled-components";

const Swatch = styled.div`
	width: 1.5rem;
	height: 1.5rem;
	border-radius: 50%;
	background: ${({ color, theme: { colors } }) => color || colors.black};
	border: 2px solid ${({ theme: { colors } }) => colors.lightnessGray};
`;

export default Swatch;
