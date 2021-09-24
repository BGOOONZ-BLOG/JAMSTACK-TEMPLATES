import styled from "styled-components";

export const Wrapper = styled.div`
	width: 100%;
	position: relative;
`;

export const SuggestionWrapper = styled.div`
	border: none;
	background-color: #3e3f42;
	color: #ffffff;
	position: absolute;
	width: 100%;
	top: 46px;
	left: 0px;
	z-index: 2;

	.single-input {
		position: relative;
	}

	.suggestion-item,
	.suggestion-item--active {
		min-height: 45px;
		padding: 10px 15px;
		display: flex;
		> span {
			flex-grow: 1;
		}
	}
`;

export const Icon = styled.div`
	padding-right: 15px;
`;
