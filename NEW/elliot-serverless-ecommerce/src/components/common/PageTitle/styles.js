import styled from "styled-components";

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2rem;
`;

export const Title = styled.h1`
	text-transform: capitalize;
	font-size: calc(36px + (48 - 36) * ((100vw - 300px) / (1600 - 300)));
	text-align: center;
	font-weight: 700;
	margin-top: 0;
	margin-bottom: 0.625rem;
`;
