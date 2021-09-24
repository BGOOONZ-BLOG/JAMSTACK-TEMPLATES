import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const Actions = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;

	a,
	button {
		display: flex;
		width: 2.5rem;
		height: 2.5rem;
		justify-content: center;
		align-items: center;
		vertical-align: top;
		width: 2.5rem;
		font-size: 22px;
		margin-right: 0.25rem;
		padding-right: 0;
		padding-left: 0;

		&:last-child {
			margin-right: 0;
		}
	}

	button {
		border: none;
		cursor: pointer;
		background: none;

		&:focus {
			outline: none;
		}
	}
`;

export const Cart = styled.a`
	position: relative;
	display: flex;
	height: 2.5rem;
	justify-content: center;
	align-items: center;
	vertical-align: top;
	width: 2.5rem;
	font-size: 22px;
	margin-right: 0.25rem;
	cursor: pointer;
`;

export const CartItems = styled.span`
	position: absolute;
	top: 0;
	right: 0.125rem;
	display: flex;
	align-items: center;
	justify-content: center;
	vertical-align: top;
	width: 1rem;
	height: 1rem;
	border-radius: 50%;
	background-color: ${({ theme: { colors } }) => colors.accent};
	font-size: 10px;
	color: ${({ theme: { colors } }) => colors.white};
`;
