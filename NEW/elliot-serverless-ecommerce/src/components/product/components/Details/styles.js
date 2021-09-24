import styled from "styled-components";

export const Wrapper = styled.div`
	h2 {
		font-weight: 700;
		color: ${({ theme: { colors } }) => colors.black};
		line-height: 1.3em;
		text-transform: none;
		font-size: 22pt;
		margin-top: 0;
		margin-bottom: 2rem;

		@media screen and (min-width: 992px) {
			font-size: 28pt;
		}
	}

	h4 {
		margin-bottom: 1rem;
		font-size: 18pt;
		font-weight: 400;
		color: ${({ theme: { colors } }) => colors.black};

		@media screen and (min-width: 992px) {
			font-size: 24pt;
			margin-bottom: 1rem;
		}
	}

	h5 {
		margin: 0 0 30px 0;
		font-size: 18pt;
		line-height: 1;
		font-weight: 400;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: 0;
		color: #777777;
		font-size: 12pt;
		line-height: 1.6;
		margin-bottom: 2rem;

		@media screen and (min-width: 992px) {
			font-size: 11pt;
		}
	}

	.css-2b097c-container {
		margin-bottom: 1rem;
	}
`;

export const Review = styled.div`
	display: flex;
	width: 100%;
	align-items: center;
	margin-bottom: 1rem;

	span {
		margin-left: 1rem;
		color: ${({ theme: { colors } }) => colors.darkGray};
		font-size: 12pt;
	}
`;

export const Sku = styled.span`
	display: block;
	margin-bottom: 1rem;
	font-size: 10pt;
	color: ${({ theme: { colors } }) => colors.darkGray};
`;

export const Shop = styled.div`
	display: grid;
	grid-template-columns: 150px 1fr;
	grid-template-rows: 1fr 1fr;
	grid-gap: 15px;
	grid-template-areas:
		"a b"
		"c c";
	margin: 30px 0;

	@media (max-width: 450px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr 1fr;
		grid-template-areas:
			"a"
			"b"
			"c";
	}
`;

export const ButtonGroup = styled.div`
	display: grid;
	grid-template-columns: 1fr auto;
	grid-gap: 0;
	grid-area: ${({ gridArea }) => gridArea};
`;

export const CustomButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const MainAction = styled.div`
	grid-column-start: 1;
	grid-column-end: -1;
`;

export const Favorite = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	color: ${({ theme: { colors } }) => colors.darkGray};
	border: 2px solid ${({ theme: { colors } }) => colors.lightnessGray};
	cursor: pointer;
	background: none;
	margin: 0 auto;
	width: 100%;

	@media screen and (max-width: 960px) {
		padding: 0.8rem 0;
	}

	svg {
		align-self: center;
	}
`;

export const Specs = styled.div`
	margin-bottom: 2rem;
	padding-top: 1.25rem;
	border-top: 1px solid ${({ theme: { colors } }) => colors.lightnessGray};

	p {
		color: ${({ theme: { colors } }) => colors.black};

		strong {
			margin-right: 0.3125rem;
			text-transform: uppercase;
			font-weight: bold;
		}

		a {
			color: ${({ theme: { colors } }) => colors.darkGray};
			font-size: 11.25pt;

			&:after {
				content: ",";
				padding-right: 0.1875rem;
			}

			&:first-child {
				padding-left: 0.3125rem;
			}

			&:last-child {
				&:after {
					display: none;
				}
			}

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

export const SocialShares = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin-top: 1.25rem;

	a {
		width: 1.875rem;
		height: 1.875rem;
		margin-right: 0.3125rem;
	}
`;

export const LabelField = styled.label`
	display: inline-block;
	margin-bottom: 1rem;
`;

export const OutOfStock = styled.div`
	border-radius: 0.1875rem;
	display: inline-block;
	font-size: 9.75pt;
	padding: 0.4375rem 0.625rem;
	font-weight: 600;
	text-align: center;
	line-height: 1;
	margin-bottom: 1rem;
	background: ${({
		theme: {
			colors: { red }
		}
	}) => red};
	color: ${({
		theme: {
			colors: { white }
		}
	}) => white};
`;
