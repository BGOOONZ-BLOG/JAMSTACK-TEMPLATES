import styled from "styled-components";

const Button = styled.button`
	display: ${({ theme: { button } }) => button.display};
	padding: ${({ theme: { button } }) => button.padding};
	font-size: ${({ theme: { button } }) => button.fontSize};
	font-weight: ${({ theme: { button } }) => button.fontWeight};
	line-height: ${({ theme: { button } }) => button.lineHeight};
	border: ${({ theme: { button } }) => button.border};
	transition: ${({ theme: { button } }) => button.transition};
	text-transform: ${({ theme: { button } }) => button.textTransform};
	cursor: ${({ theme: { button } }) => button.cursor};

	&:hover {
		transition: ${({ theme: { button } }) => button.transition};
	}

	${({ wide }) =>
		wide &&
		`
      width: 100%;
      text-align: center;
	`}

    ${({ marginBottom }) =>
			marginBottom &&
			`
        margin-bottom: ${marginBottom}rem;
    `}

	${({
		variant,
		theme: {
			button: {
				variants: { primary, secondary, outlined, flat, ghost }
			}
		}
	}) => {
		switch (variant) {
			case "primary":
				return `
					color: ${primary.color};
					background: ${primary.bg};

					&:hover {
							background: ${primary.hover.bg};
					}
			`;
			case "secondary":
				return `
					color: ${secondary.color};
					background: ${secondary.bg};
					border: ${secondary.border};

					&:hover {
							background: ${secondary.hover.bg};
							color: ${secondary.hover.color};
							border-color: ${secondary.hover.bg};
					}
				`;
			case "outlined":
				return `
					color: ${outlined.color};
					padding: ${outlined.padding};
					border: ${outlined.border};

					&:hover {
							color: ${outlined.hover.color};
							border-color: ${outlined.hover.color};
					}
				`;
			case "flat":
				return `
					color: ${flat.color};
					border: ${flat.border};
					background: ${flat.bg};

					&:hover {
							color: ${flat.hover.color};
							background: ${flat.hover.bg};
					}
				`;
			case "ghost":
				return `
					color: ${ghost.color};
					border: ${ghost.border};
					background: ${ghost.bg};

					&:hover {
							color: ${ghost.hover.color};
							background: ${ghost.hover.bg};
					}
				`;
			default:
				return null;
		}
	}}

	${({ state }) => {
		switch (state) {
			case "PAYMENT SUCCESSFUL":
				return `
					background: #4CAF50;

					&:hover {
							background: #81C784;
					}
			`;
			case "PAYMENT FAILED":
				return `
					background: #f44336;

					&:hover {
							background: #ef9a9a;
					}
			`;
			default:
				return null;
		}
	}}

	&:disabled {
		background-color: #cccccc;
		color: #666666;
	}
`;

export default Button;
