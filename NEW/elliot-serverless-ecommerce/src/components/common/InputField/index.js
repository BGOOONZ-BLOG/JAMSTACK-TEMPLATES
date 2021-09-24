import styled from "styled-components";

const InputField = styled.input`
	border: 2px solid #eaeaea;
	font-size: 12px;
	color: #222;
	width: 100%;
	height: 50px;
	padding: 1em;

	&:focus {
		outline: none;
		border-color: ${({
			theme: {
				colors: { accent }
			}
		}) => accent};
	}

	${({ textArea }) =>
		textArea &&
		`
    height: auto;
    padding: 2rem;
    resize: none;
  `}
`;

export default InputField;
