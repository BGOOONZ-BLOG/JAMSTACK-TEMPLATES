import styled from "styled-components";

export const CartItem = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #e9e6e6;
	padding: 1rem 0;

	&:last-child {
		border-bottom: unset;
	}
`;

export const Thumbnail = styled.div`
	position: relative;
	overflow: hidden;
	z-index: 10;
	width: 100%;
	max-width: 7.5rem;

	img {
		width: 100%;
	}
`;

export const Content = styled.div`
	position: relative;
	padding-left: 1.25rem;
	width: 100%;

	a {
		cursor: pointer;
		outline: none;
		font-size: 16px;
		position: relative;
		color: inherit;
		text-decoration: none;
		transition: ${({ theme: { transitions } }) => transitions.default400};
	}

	p {
		font-size: 16px;
		color: ${({ theme: { colors } }) => colors.darkGray};
		margin-bottom: 0;
		line-height: 1.6;

		span {
			color: #cc0000;
			font-size: 12pt;
		}
	}
`;

export const CartFooter = styled.div`
	padding-top: 3.125rem;
	margin-top: 3.125rem;
	border-top: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};

	h3 {
		display: block;
		font-size: 18px;
		font-weight: 600;
		text-transform: capitalize;
		color: ${({ theme: { colors } }) => colors.black};
		line-height: 1.6;
		margin-top: 0;
		position: relative;

		strong {
			float: right;
			color: #c00;
			font-size: 18px;
			font-weight: 500;
			margin-bottom: 2rem;
		}
	}
`;
