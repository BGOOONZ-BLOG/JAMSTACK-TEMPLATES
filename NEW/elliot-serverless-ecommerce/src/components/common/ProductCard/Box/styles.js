import styled from "styled-components";

export const Thumbnail = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;

	a {
		display: block;
		height: 100%;
		width: 100%;
	}

	img {
		width: 100%;
		transition: ${({ theme: { transitions } }) => transitions.custom400};
		opacity: 1;
		float: left;
		width: 270px;
		height: 270px;
		object-fit: cover;

		@media (max-width: 680px) {
			width: 345px;
			height: 345px;
		}

		&.secondary {
			opacity: 0;
			position: absolute;
			top: 0;
			left: 0;
			opacity: 0;
		}
	}

	&:hover {
		div {
			transform: translateY(0);
		}

		img {
			&:first-child {
				opacity: 0;
				position: absolute;
				top: 0;
				left: 0;
				opacity: 0;
			}
			&.secondary {
				opacity: 1;
				position: unset;
			}
		}
	}
`;

export const Details = styled.div`
	h2 {
		font-size: 12pt;
		font-weight: 500;
		line-height: 1.4;
		margin-bottom: 0.5rem;
		color: ${({ theme: { colors } }) => colors.black};
	}

	p {
		margin-bottom: unset;
		font-size: 10pt;
		font-weight: 400;
		margin-top: 0.6rem;
		color: ${({ theme: { colors } }) => colors.darkGray};

		span {
			margin-right: 0.04rem;
		}
	}
`;

// export const Body = styled.div`
// 	padding: 2rem 0;

// 	p {
// 		line-height: 1.6em;
// 		font-size: 12pt;
// 		color: ${({ theme: { colors } }) => colors.darkGray};
// 	}
// `;

// export const Footer = styled.div`
// 	text-align: left;
// `;

export const AddToCart = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	padding: 0.3rem 0 0;
	display: flex;
	justify-content: space-between;
	background-color: ${({ theme: { colors } }) => colors.white};
	transition: ${({ theme: { transitions } }) => transitions.custom750};
	transform: translateY(100%);

	button {
		font-size: 10pt;
		text-transform: uppercase;
		font-weight: 500;
		align-self: center;
		border: none;
		background: none;
		transition: ${({ theme: { transitions } }) => transitions.default400};
		color: ${({
			theme: {
				colors: { black }
			}
		}) => black};

		&:hover {
			color: ${({
				theme: {
					colors: { accent }
				}
			}) => accent};
		}
	}

	ul {
		li {
			display: inline-block;
			cursor: pointer;

			&:first-child {
				margin-right: 0.625rem;
			}
		}
	}
`;
