import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	align-items: center;
	padding-top: 0.2rem;

	svg {
		margin: 0 0.1rem;

		&:first-child {
			margin: 0 0 0 0.1rem;
		}

		&:last-child {
			margin: 0 0.1rem 0 0;
		}
	}
`;
