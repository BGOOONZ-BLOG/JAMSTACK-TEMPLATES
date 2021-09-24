import styled from "styled-components";

export const Container = styled.div`
	width: 100%;
	z-index: 6;
	position: fixed;
	top: 0;
	left: 0;
`;

export const Banner = styled.div`
	padding: 1.2rem 0;
	text-align: center;
	color: ${({
		theme: {
			colors: { black }
		}
	}) => black};
	background: ${({
		theme: {
			colors: { accent }
		}
	}) => accent};
`;

export const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
	background-color: ${({ theme: { colors } }) => colors.white};
	padding: 1rem;
	transition: ${({ theme: { transitions } }) => transitions.default200};

	ul {
		margin-top: 0;
		margin-bottom: 0;
		padding: 0;
	}

	ol {
		margin: 0;
		padding: 0;
		list-style: none;
	}

	@media (min-width: 1200px) {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;
	}

	@media (min-width: 1440px) {
		padding: 0 60px;
	}

	@media (min-width: 1680px) {
		padding: 10px 80px;
	}

	@media (max-width: 1200px) {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 20px;
	}
`;

export const Options = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;
