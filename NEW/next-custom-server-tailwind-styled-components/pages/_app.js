import { ThemeProvider } from "styled-components";
import GlobalStyle from "../theme/global-style";
import theme from "../theme";
import "../styles/index.css";
// Uncomment this import "../theme/fonts.css"

export default function MyApp({ Component, pageProps }) {
	return (
		<>
			<GlobalStyle />
			<ThemeProvider theme={theme}>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
