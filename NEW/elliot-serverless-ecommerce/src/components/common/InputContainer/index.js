import styled from "styled-components";

const InputContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 2.5rem;

	&.has__error {
		label,
		span {
			color: ${({ theme: { colors } }) => colors.red};
		}

		input,
		input[type="search"],
		input[type="number"],
		select,
		textarea {
			border-color: ${({ theme: { colors } }) => colors.red};
		}
	}

	label {
		margin-bottom: 0.75rem;
		font-weight: 400;
		color: ${({ theme: { colors } }) => colors.black};
		line-height: 1.2;
		font-size: 10.5pt;
		display: inline-block;
	}

	input,
	input[type="search"],
	input[type="number"],
	select,
	textarea {
		box-sizing: border-box;
		transition: ${({ theme: { transitions } }) => transitions.default400};
		outline: none;
		border: 1px solid #ddd;
		border-radius: 0;
		background: transparent;
		font-size: 10.5pt;
		padding: 0.625rem 1.25rem;
		width: 100%;
		resize: none;
		line-height: 1;
		color: #495057;
		appearance: none;

		&:focus {
			border-color: ${({ theme: { colors } }) => colors.accent};
		}
	}

	span {
		color: ${({ theme: { colors } }) => colors.red};
		font-size: 9.75pt;
		line-height: 1.5;
		margin-top: 0.3125rem;
		font-style: italic;
	}
`;

export default InputContainer;
