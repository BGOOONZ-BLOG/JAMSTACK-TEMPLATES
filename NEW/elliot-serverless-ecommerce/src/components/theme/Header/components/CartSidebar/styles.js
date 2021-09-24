import styled from "styled-components";

export const Wrapper = styled.div`
	position: relative;
`;

export const CartItem = styled.div`
	padding-bottom: 1.875rem;
	margin-bottom: 1.875rem;
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
	display: flex;
	justify-content: space-between;

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

	button {
		position: absolute;
		top: 0;
		right: 0;
		border: none;
		background: none;
	}

	span {
		color: #cc0000;
		font-size: 12pt;
	}

	a {
		cursor: pointer;
		outline: none;
		font-size: 16px;
		position: relative;
		color: inherit;
		text-decoration: none;
		transition: ${({ theme: { transitions } }) => transitions.default400};
		width: 150px;
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	p {
		font-size: 16px;
		color: ${({ theme: { colors } }) => colors.darkGray};
		margin-bottom: 0;
		line-height: 1.6;
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
		}

		&:last-of-type {
			margin-bottom: 2rem;
		}
	}

	button {
		margin-bottom: 0.625rem;
		padding: 0.75rem 1.875rem;
		text-align: center;
		width: 100%;

		&:last-child {
			margin-bottom: unset;
		}
	}
`;

export const EmptyState = styled.div`
	text-align: center;
`;

export const Attribute = styled.div`
	margin-top: 0.5rem;

	span {
		color: ${({
			theme: {
				colors: { darkGray }
			}
		}) => darkGray};
		text-transform: uppercase;
		font-weight: bold;
	}
`;
