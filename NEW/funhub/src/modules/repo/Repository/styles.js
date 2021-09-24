import styled from "styled-components";

export const Container = styled.div`
	max-width: 960px;
	margin: 0 auto;
	padding: 2rem 0;

	@media (max-width: 960px) {
		max-width: 100%;
		width: 90%;
	}
`;

export const Card = styled.div`
	border: 1px solid #000;
	border-radius: 3px;
	width: 100%;
	padding: 1rem;

	h1 {
		font-size: 12pt;
	}
`;
