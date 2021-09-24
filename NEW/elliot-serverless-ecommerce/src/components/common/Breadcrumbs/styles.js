import styled from "styled-components";

export const Flex = styled.div`
	display: flex;
	justify-content: ${({ flexAlign }) => flexAlign || "center"};
`;

export const Item = styled.a`
	display: inline-block;
	color: ${({ active, theme: { colors } }) =>
		active ? colors.black : colors.darkGray};
	font-size: 14px;
	cursor: ${({ active }) => (active ? "unset" : "pointer")};

	&:after {
		content: "";
		display: inline-block;
		vertical-align: middle;
		width: 0.25rem;
		height: 0.25rem;
		border-radius: 50%;
		background-color: ${({ theme: { colors } }) => colors.lightGray};
		margin: 0 0.625rem;
	}

	&:last-child {
		&:after {
			content: unset;
		}
	}
`;
