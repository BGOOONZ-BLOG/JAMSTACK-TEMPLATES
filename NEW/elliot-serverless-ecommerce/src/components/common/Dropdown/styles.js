import styled from "styled-components";

export const Wrapper = styled.div`
	list-style: none;
	position: relative;
	cursor: pointer;
	padding: 0;
	margin: 0 1.875rem;
	${({ standalone }) =>
		standalone &&
		`
		max-width: 70%;
		margin: 0;
	`}

	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}
`;

export const Label = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12pt;
	font-weight: 600;
`;

// I used 99% to do a visual hack to keep border right in the overflow case
export const List = styled.ul`
	background-color: ${({ theme: { colors } }) => colors.white};
	border: 1px solid ${({ theme: { colors } }) => colors.darkGray};
	max-height: 6.25rem;
	overflow-y: auto;
	position: absolute;
	right: 0;
	top: 130%;
	width: 99%;
`;

export const Arrow = styled.span`
	margin: 0 0.625rem;
`;

export const Item = styled.li`
	font-size: 12pt;
	padding: 0.375rem 1rem;
	line-height: 1.5;
	transition: ${({ theme: { transitions } }) => transitions.default200};

	&:hover {
		color: ${({ theme: { colors } }) => colors.white};
		background-color: ${({ theme: { colors } }) => colors.accent};
	}
`;

export const DefaultValue = styled.p`
	font-size: 12pt;
	color: ${({ theme: { colors } }) => colors.darkGray};
	min-width: 3.75rem;
	text-align: center;
	margin: 0 0 0 0.3125rem;
`;
