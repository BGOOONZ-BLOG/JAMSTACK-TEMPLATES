import styled from "styled-components";

export const Description = styled.div`
	h3 {
		margin-bottom: 2.5rem;
		font-weight: 400;
		font-size: 18pt;
		margin-top: 0;
		color: ${({ theme: { colors } }) => colors.black};
	}
	p,
	li {
		margin-bottom: 1.5625rem;
		font-size: 12pt;
		color: #777;
		line-height: 1.6em;
	}
	ul {
		margin: 0;
		padding-left: 1.25rem;
	}
	li {
		margin-bottom: 0;
		line-height: 1.5;
	}
	img {
		display: inline-block;
		outline: 0;
		max-width: 100%;
		height: auto;
	}
`;

export const Addition = styled.div`
	table {
		border-collapse: collapse;
		width: 100%;
		margin-bottom: 1rem;
		background-color: transparent;
		border: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};
	}
	td,
	th {
		padding: 0.625rem 0.9375rem;
		color: ${({ theme: { colors } }) => colors.black};
		vertical-align: middle;
		border: none;
		font-size: 10.5pt;
		border-bottom: 1px solid #ddd;
	}
	.td__key {
		max-width: 9.375rem;
		width: 9.375rem;
		font-weight: 600;
		background-color: ${({ theme: { colors } }) => colors.lightnessGray};
	}
`;

export const Review = styled.div`
	h4 {
		margin: 0.625rem 0 1rem 0;
		font-size: 12pt;
		font-weight: 600;
		color: ${({ theme: { colors } }) => colors.black};
		span {
			color: ${({ theme: { colors } }) => colors.darkGray};
		}
	}
	p {
		line-height: 1.6em;
		color: ${({ theme: { colors } }) => colors.darkGray};
		font-size: 12pt;
		small {
			margin-bottom: 1.25rem;
			color: ${({ theme: { colors } }) => colors.black};
			font-size: 10.5pt;
			line-height: 1.6em;
		}
	}
	.social__connect {
		list-style-type: none;
		padding: 0;
		margin: 0;

		&__item {
			position: relative;
			display: inline-block;
			margin-right: 0.625rem;
			&:last-of-type {
				margin-right: 0;
			}
		}
	}
	h5 {
		margin-bottom: 1.5rem;
		font-weight: 500;
		font-size: 13.5pt;
	}
`;
