import styled from "styled-components";

export const Wrapper = styled.div`
	margin-top: 2rem;
	display: flex;
	flex-flow: column wrap;
	justify-content: space-between;
	padding: 4rem 1rem;
	border-top: 1px solid #eaeaea;

	@media (min-width: 768px) {
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
	}
`;

export const Actions = styled.div`
	max-width: 370px;
	width: 100%;
`;

export const Buttons = styled.div`
	margin-bottom: 50px;

	@media (max-width: 680px) {
		margin-bottom: 15px;
	}
`;
