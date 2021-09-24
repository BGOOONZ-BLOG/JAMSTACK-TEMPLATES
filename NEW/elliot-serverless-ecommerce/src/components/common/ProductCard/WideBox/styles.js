import styled from "styled-components";

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: calc(40% - 3.125rem) 1fr;
	grid-column-gap: 3.125rem;
	width: 100%;
	border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
	padding-bottom: 4.375rem;

	@media screen and (max-width: 600px) {
		grid-template-columns: 1fr;
	}
`;

export const Thumbnail = styled.div`
	margin-right: 1rem;
	position: relative;
	overflow: hidden;
	width: 100%;
	flex: 1;

	@media screen and (max-width: 960px) {
		margin-right: unset;
		margin-bottom: 1rem;
		flex: unset;
	}

	img {
		width: 100%;
		transition: ${({ theme: { transitions } }) => transitions.custom400};
		opacity: 1;

		&:last-child {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}

	&:hover {
		img {
			&:first-child {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}
			&:last-child {
				opacity: 1;
				position: unset;
			}
		}
	}
`;

export const Content = styled.div`
	padding-top: 1.875rem;
	flex: 2;

	@media screen and (max-width: 960px) {
		flex: unset;
		width: 100%;
	}
`;

export const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: flex-start;

	@media screen and (max-width: 960px) {
		flex-direction: column;
	}
`;

export const Details = styled.div`
	padding-bottom: 1.25rem;

	h2 {
		font-size: 18pt;
		font-weight: 600;
		line-height: 1.4em;
		margin: 0;
		padding-bottom: 0.3125rem;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: unset;
		font-size: 12pt;
		font-weight: 600;
		margin-top: 0.5rem;
		color: ${({ theme: { colors } }) => colors.darkGray};

		span {
			margin-right: 0.04rem;
		}
	}
`;

export const Body = styled.div`
	p {
		margin: 0;
		line-height: 1.6em;
		font-size: 12pt;
		color: ${({ theme: { colors } }) => colors.darkGray};
	}
`;

export const Footer = styled.div`
	text-align: left;
	padding-top: 2.5rem;
`;

export const Prices = styled.div`
	display: flex;
	align-items: center;

	p:first-child {
		margin-right: 1rem;
	}
`;
