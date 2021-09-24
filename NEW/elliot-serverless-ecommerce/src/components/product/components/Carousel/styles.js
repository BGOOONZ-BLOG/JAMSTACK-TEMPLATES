import styled from "styled-components";

export const Wrapper = styled.div`
	max-width: ${({ single }) => (single ? "100%" : "50%")};
	margin: 0;
	padding: 0;
	min-width: ${({ single }) => (single ? "100%" : "50%")};
	border-radius: 0;

	img {
		background-color: #f7f7f7;
		width: 100%;
		max-width: ${({ single }) => (single ? "100%" : "18.75rem")};
	}
`;

export const Arrow = styled.div`
	background-image: none;
	width: 2.1875rem;
	height: 2.1875rem;
	background-color: transparent;
	border-radius: 0.25rem;
	display: flex;
	justify-content: center;
	transition: all 300ms ease;

	${({ prev }) =>
		!prev &&
		`
    transform: rotate(0deg);
	`}

	&:after {
		color: #000;
		transition: color 200ms ease;
	}

	&:hover {
		&:after {
			background-color: transparent;
			color: ${({
				theme: {
					colors: { accent }
				}
			}) => accent};
		}
	}
`;
