import styled from "styled-components";

export const Menu = styled.ul`
	margin-left: 7.1875rem;
	margin-right: auto;

	@media screen and (max-width: 1200px) {
		display: none;
	}

	li {
		position: relative;
		display: inline-block;
		padding-right: 2.5rem;

		&:hover ul {
			visibility: visible;
			opacity: 1;
			transform: scale3d(1, 1, 1) translateY(0);
		}

		a {
			position: relative;
			display: inline-block;
			padding: 1.875rem 0;
			font-size: 16px;
			font-weight: 400;
			line-height: 20px;
			color: ${({
				theme: {
					colors: { black }
				}
			}) => black};
			text-transform: capitalize;
			transform-style: preserve-3d;

			&:after {
				content: "";
				position: absolute;
				bottom: 1.25rem;
				left: 0;
				width: 100%;
				height: 2px;
				background-color: ${({
					theme: {
						colors: { black }
					}
				}) => black};
				transform: scale3d(0, 1, 1);
				transform-origin: 100% 50%;
				transition: transform 0.6s cubic-bezier(0.7, 0, 0.3, 1);
			}

			&:hover {
				color: ${({
					theme: {
						colors: { accent }
					}
				}) => accent};

				&:after {
					transform-origin: 0 50%;
					transform: scale3d(1, 1, 1);
				}
			}
		}

		&:first-child {
			padding-left: 0;
		}

		&:last-child {
			margin-right: 0;
			padding-right: 0;
		}

		@media screen and (max-width: 1199px) {
			li {
				display: block;
				padding-right: 0;
				border-bottom: 1px dashed #e4e4e4;

				a {
					display: block;
					color: ${({
						theme: {
							colors: { black }
						}
					}) => black};
					font-size: 1.5rem;
					padding: 1rem 0;
					line-height: 20px;
				}
			}
		}
	}
`;

export const InnerMenu = styled.ul`
	position: absolute;
	left: 0;
	top: 100%;
	min-width: 240px;
	visibility: hidden;
	opacity: 0;
	transform: scale3d(1, 1, 0) translateY(30px);
	transition: all 0.25s ease;
	z-index: 1000;
	border: 1px solid #eee;
	background-color: rgba(255, 255, 255);
	visibility: hidden;
	opacity: 0;

	& li a {
		display: inline-block;
		padding: 10px 20px;
		width: 100%;
		font-size: 15px;
		color: #6f6f6f;
		text-transform: capitalize;
		transition: all 0.8s cubic-bezier(0.19, 1, 0.22, 1);
	}

	& li a:hover:after {
		content: none;
	}
`;
