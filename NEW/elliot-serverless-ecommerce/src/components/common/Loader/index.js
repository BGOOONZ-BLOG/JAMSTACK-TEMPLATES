import styled from "styled-components";

export default styled.span`
	display: inline-block;
	border: 1px solid lighten(#f68773, 25); /* Light grey */
	border-top: 1px solid #f68773; /* Blue */
	border-radius: 50%;
	width: 16px;
	height: 16px;
	animation: spinloader 2s linear infinite;

	@keyframes spinloader {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
`;
