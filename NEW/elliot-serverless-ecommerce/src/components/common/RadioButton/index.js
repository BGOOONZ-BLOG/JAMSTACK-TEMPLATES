import styled from "styled-components";

const RadioButton = styled.div`
	margin-bottom: 10px;
	position: relative;

	label {
		position: relative;
		margin-bottom: 0;
		padding-left: 30px;
		color: #737373;
		font-weight: 400;
		cursor: pointer;
		display: flex;
		justify-content: space-between;
		font-size: 14px;

		&:before {
			content: "";
			display: block;
			position: absolute;
			left: 0;
			top: 0px;
			height: 20px;
			width: 20px;
			z-index: 3;
			border: 1px solid rgba(19, 8, 1, 0.2);
			background-color: #fff;
			transition: all 0.4s ease;
			border-radius: 50%;
		}

		&:after {
			content: "";
			display: block;
			position: absolute;
			top: 5px;
			left: 5px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background-color: #fff;
			z-index: 3;
			opacity: 0;
			transform: scale(1.5, 1.5);
			transition: all 0.6s ease;
		}

		span {
			color: #6f6f6f;
			font-size: 14px;
			font-weight: 400;
		}
	}

	input {
		position: absolute;
		visibility: hidden;

		&:checked ~ label {
			&:before {
				background-color: transparent;
			}

			&:after {
				background-color: #f68773;
				border-radius: 50%;
				border: none;
				width: 8px;
				height: 8px;
				top: 6px;
				left: 6px;
				opacity: 1;
			}
		}
	}
`;

export default RadioButton;
