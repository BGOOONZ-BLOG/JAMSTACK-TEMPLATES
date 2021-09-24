import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	align-items: center;

	p:first-child {
		margin-right: 1rem;

		span {
			color: ${({
				theme: {
					colors: { darkGray }
				}
			}) => darkGray};
		}
	}
`;
