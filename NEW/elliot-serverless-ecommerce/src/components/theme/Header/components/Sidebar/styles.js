import styled from "styled-components";

export const Wrapper = styled.div`
	position: absolute;
	height: 100%;
	color: ${({ theme: { colors } }) => colors.darkBlack};

	ul:not(:last-child) {
		padding-bottom: 1.5rem;
	}

	a {
		white-space: nowrap;
	}

	h3 {
		font-weight: 400;
		margin: 0;
	}
`;

export const Overlay = styled.div`
	display: block;
	pointer-events: none;
	opacity: 0;
	transition: opacity 200ms ease;

	${({ visible }) =>
		visible &&
		`
		pointer-events: initial;
		opacity: 1;
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0,0,0,0.6);
		width: 100%;
		height: 100%;
		z-index: 100;
	`}
`;

export const Nav = styled.div`
	position: fixed;
	top: 0;
	right: 0;
	width: 100%;
	max-width: 29.375rem;
	height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	z-index: 10001;
	background-color: ${({ theme: { colors } }) => colors.white};
	transform: translateX(100%);
	border-left: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
	transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1) 0s;

	${({ visible }) =>
		visible &&
		`
    transform: translateX(0);
  `}

	li {
		margin-left: 0;
		width: 15.625rem;
		transition: ${({ theme: { transitions } }) => transitions.default300};
	}
`;

export const Burger = styled.div`
	padding: 1.25rem 1.875rem 0;
	width: 100%;
`;

export const Close = styled.div`
	width: 2.5rem;
	height: 2.5rem;
	transition: ${({ theme: { transitions } }) => transitions.default300};
	cursor: pointer;
	position: relative;

	&:before {
		display: block;
		content: "";
		position: absolute;
		width: 90%;
		top: 50%;
		height: 2px;
		transform: rotate(45deg);
		background-color: ${({ theme: { colors } }) => colors.darkGray};
		border-radius: 1px;
	}

	&:after {
		display: block;
		content: "";
		position: absolute;
		width: 90%;
		top: 50%;
		height: 2px;
		transform: rotate(-45deg);
		background-color: ${({ theme: { colors } }) => colors.darkGray};
		border-radius: 1px;
	}
`;

export const Content = styled.div`
	height: 100%;
	display: flex;
	justify-content: flex-start;
	flex-direction: column;
	padding: 3.125rem;
`;
