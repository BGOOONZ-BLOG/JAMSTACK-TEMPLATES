import styled from "styled-components";

export const Wrapper = styled.footer`
	margin-top: 5.9375rem;

	ul {
		list-style: none;
	}

	a {
		color: ${({ theme: { colors } }) => colors.darkGray};
		position: relative;
		display: inline-block;
		padding: 0.3125rem 0;
		line-height: 1.25rem;
		transition: ${({ theme: { transitions } }) => transitions.default400};
		text-decoration: none;
		background-color: transparent;
	}

	a:hover {
		color: ${({ theme: { colors } }) => colors.black};
	}

	a:before {
		content: "";
		position: absolute;
		bottom: 2px;
		width: 100%;
		height: 1px;
		background-color: ${({ theme: { colors } }) => colors.darkBlack};
		transition: ${({ theme: { transitions } }) => transitions.custom400};
		transform: scale3d(0, 1, 1);
		transform-origin: 0% 50%;
	}

	a:hover:before {
		transform-origin: 100% 50%;
		transform: scale3d(1, 1, 1);
	}
`;

export const Navigation = styled.nav`
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	max-width: 75rem;
	padding-right: 0.9375rem;
	padding-left: 0.9375rem;
	margin-right: auto;
	margin-left: auto;
	padding-bottom: 3.125rem;

	@media (max-width: 960px) {
		grid-template-columns: repeat(2, 1fr);
		grid-row-gap: 3.125rem;
		grid-column-gap: 1.25rem;
	}
`;

export const List = styled.ul`
	margin: 0;
	padding: 0;
`;

export const Item = styled.li`
	font-size: 11.25pt;
	line-height: 1.375rem;
	color: ${({ theme: { colors } }) => colors.darkGray};
`;

export const ListTitle = styled.li`
	font-size: 10.5pt;
	margin-bottom: 2.5rem;
	font-weight: 700;
	text-transform: uppercase;

	@media (max-width: 960px) {
		margin-bottom: 1.875rem;
	}
`;

export const Separator = styled.hr`
	border: none;
	height: 1px;
	background-color: ${({ theme: { colors } }) => colors.lightnessGray};
`;

export const CopyWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	img {
		max-width: 250px;
	}

	p {
		font-size: 10.5pt;
		line-height: 2.5rem;
		color: ${({ theme: { colors } }) => colors.darkGray};

		span {
			color: ${({ theme: { colors } }) => colors.darkBlack};
			font-weight: 700;
		}
	}

	ul {
		margin: 0;
		padding: 0;
	}

	ul li {
		display: inline-block;
		font-size: 11.25pt;
		line-height: 2.5rem;
	}

	ul li:not(:last-child) {
		margin-right: 0.9375rem;
	}

	@media (max-width: 960px) {
		flex-wrap: wrap;
		margin: 1.25rem auto;

		p {
			margin: 0;
		}
	}
`;
