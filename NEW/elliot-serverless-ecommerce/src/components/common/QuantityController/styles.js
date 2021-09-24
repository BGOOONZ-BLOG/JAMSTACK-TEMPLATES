import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: 7.5rem;
	display: flex;
	align-items: center;
	justify-content: space-around;
	border: 2px solid ${({ theme: { colors } }) => colors.lightnessGray};
	height: 50px;
	grid-area: a;

	${({ wide }) =>
		wide &&
		`
		max-width: 9.375rem;
		margin: 0;

		@media (max-width: 960px) {
			max-width: 100%;
		}
	`}

	input {
		border: none;
		height: 2.8125rem;
		max-width: calc(100% - 64px);
		font-size: 14px;
		font-weight: 600;
		text-align: center;
		color: ${({ theme: { colors } }) => colors.black};
		background-color: transparent;
		outline: none;
		transition: ${({ theme: { transitions } }) => transitions.default400};
		display: block;

		&::placeholder {
			color: ${({ theme: { colors } }) => colors.black};
		}
	}
`;

export const Controller = styled.button`
	font-size: 1.875rem;
	border: none;
	background: none;
`;
