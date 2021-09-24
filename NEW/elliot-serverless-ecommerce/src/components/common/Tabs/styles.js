import styled from "styled-components";

export const Wrapper = styled.div`
	.react-tabs__tab-list {
		position: relative;
		display: block;
		width: 100%;
		margin: 0 0 6.25rem;
		padding: 1.25rem 0;
		border-top: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
		border-bottom: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
		text-align: center;
		list-style: none;
	}

	.react-tabs__tab {
		display: inline-block;
		position: relative;
		padding: 0.625rem 1.875rem;
		margin-right: 0.625rem;
		line-height: 1.25rem;
		font-weight: 700;
		font-size: 15pt;
		color: ${({ theme: { colors } }) => colors.darkGray};
		border-radius: 3.125rem;
		border: 1px solid transparent;
		cursor: pointer;
		transition: ${({ theme: { transitions } }) => transitions.default400};
		&:last-of-type {
			margin-right: 0;
		}
	}

	.react-tabs__tab--selected {
		color: ${({ theme: { colors } }) => colors.darkBlack};
	}

	@media (max-width: 960px) {
		.react-tabs__tab {
			font-size: 13pt;
			padding: 0.625rem 0.9375rem;
		}
	}

	@media (max-width: 680px) {
		.react-tabs__tab {
			font-size: 10pt;
			padding: 0.3125rem;
		}
	}
`;
