import styled from "styled-components";

export const Wrapper = styled.div`
	${({ grid }) =>
		!grid &&
		`
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
		padding: 3rem 0;

		@media screen and (max-width: 960px) {
			flex-direction: column;
		}
	`}
`;

export const Thumbnail = styled.div`
	${({ grid }) =>
		!grid &&
		`
		@media screen and (min-width: 1200px) {
			max-width: calc(40% - 50px);
		}

		@media screen and (min-width: 768px) {
			max-width: calc(40% - 30px);
		}

		@media screen and (max-width: 960px) {
			margin-right: unset;
			margin-bottom: 1rem;
		}
	`}

	img {
		width: 100%;
		position: relative;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		display: block;
	}
`;

export const Header = styled.div`
	${({ grid }) =>
		!grid &&
		`
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		@media screen and (max-width: 960px) {
			flex-direction: column;
		}
	`}
`;

export const Details = styled.div`
	h2 {
		font-size: 24px;
		font-weight: 600;
		line-height: 1.4em;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: unset;
		font-size: 16px;
		font-weight: 600;
		margin-top: 0.5rem;
		color: ${({ theme: { colors } }) => colors.darkGray};

		span {
			margin-right: 0.04rem;
		}
	}
`;

export const Body = styled.div`
	padding: 2rem 0;

	p {
		line-height: 1.6em;
		font-size: 16px;
		color: ${({ theme: { colors } }) => colors.darkGray};
	}
`;

export const Footer = styled.div`
	text-align: left;
`;
