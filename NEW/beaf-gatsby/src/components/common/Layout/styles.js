import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
	html {
		body {
			font-family: 'Questrial', sans-serif;
			margin: 0;
			padding: 0;
		}

		a {
			text-decoration: none;
			color: inherit;

			&:focus {
					outline: none;
			}
		}

		button, input, select {
			&:focus {
					outline: none;
			}
		}
	}
`;
