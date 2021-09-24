import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    font-family: "Roboto", sans-serif;
    font-weight: 400;
  }

  *, ::after, ::before {
    box-sizing: border-box;
  }

  html {
    font-size: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    scroll-behavior: smooth;
  }

  body {
    margin: 0;
  }

  img {
    user-select: none;
  }

  button {
    cursor: pointer;

    &:hover {
      outline: none;
    }
  }

  a {
    text-decoration: none;
  }
  
  h2 {
    font-size: calc(24px + (36 - 24) * ((100vw - 300px) / (1600 - 300)));
  }
  h3 {
    font-size: calc(18px + (24 - 18) * ((100vw - 300px) / (1600 - 300)));
  }
  h4 {
    font-size: calc(16px + (18 - 16) * ((100vw - 300px) / (1600 - 300)));
  }
  h5 {
    font-size: calc(14px + (16 - 14) * ((100vw - 300px) / (1600 - 300)));
  }
  input {
    border-radius: 0;
  }

  button, input {
    -webkit-appearance: none;
  }

  button:focus {
    outline: none;
  }

  .swal2-actions .swal2-styled.swal2-confirm {
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

    ${({
			theme: {
				button: {
					variants: { primary }
				}
			}
		}) => `
        color: ${primary.color};
        background: ${primary.bg};

        &:hover {
            background: ${primary.hover.bg};
        }
      `}
  }
`;

export default GlobalStyle;
