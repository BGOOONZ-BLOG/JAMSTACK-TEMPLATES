import styled from "styled-components";

export const Label = styled.label`
	background: ${({ theme: { colors }, isHot }) =>
		isHot ? colors.red : colors.accent};
	position: absolute;
	top: 0;
	top: 1.25rem;
	left: 1.25rem;
	z-index: 5;
	border-radius: 0.1875rem;

	span {
		display: inline-block;
		font-size: 9.75pt;
		padding: 0.4375rem 0.625rem;
		font-weight: 600;
		text-align: center;
		line-height: 1;
		color: ${({ theme: { colors } }) => colors.white};
	}
`;
