import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
	html {
		@font-face {
			font-family: 'Roboto';
			font-style: normal;
			font-display: fallback;
			src: url('./fonts/roboto.ttf') format('ttf');
		}
	}

	body {
		font-family: 'Roboto', sans-serif;
		margin: 0;
		padding: 0;
		background: #f7f7f7;
	}

	a {
		text-decoration: none;
		color: inherit;

		&:focus {
				outline: none;
		}
	}

	input:focus, textarea:focus, button:focus {
		outline: none;
	}
`
