import styled from "styled-components";

export const Navigation = styled.div`
	ul {
		padding-inline-start: unset;

		li {
			a {
				display: block;
				color: ${({ theme: { colors } }) => colors.darkGray};
				line-height: 20px;

				&:hover {
					color: ${({
						theme: {
							colors: { accent }
						}
					}) => accent};
				}

				&.active {
					color: ${({
						theme: {
							colors: { accent }
						}
					}) => accent};
				}
			}
		}
	}
`;

export const DesktopMenu = styled.ul`
	display: block;

	li {
		list-style: none;
		padding: 0.9375rem 0;

		a {
			font-size: 36px;
			font-weight: 600;
			color: ${({ theme: { colors } }) => colors.darkGray};

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}
		}
	}
`;

export const Menu = styled.div`
	padding-bottom: 3.75rem;
`;

export const Options = styled.div`
	display: flex;
	padding-bottom: 3.75rem;
`;

export const MenuBottom = styled.div`
	figcaption {
		margin-bottom: 1.25rem;
		font-size: 20px;
		font-weight: 600;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		font-size: 16px;
		line-height: 1.6em;
		color: ${({ theme: { colors } }) => colors.darkGray};
	}
`;

export const List = styled.ul`
	max-width: 12.5rem;
	width: 130px;

	li {
		width: 100% !important;
		list-style: none;

		a {
			display: block;
			color: ${({ theme: { colors } }) => colors.darkGray};
			line-height: 20px;
			font-size: 16px;

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}

			&.active {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};
			}
		}
	}
`;
