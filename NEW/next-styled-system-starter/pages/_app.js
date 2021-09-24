import App from "next/app";
import { ThemeProvider } from "styled-components";
import GlobalStyle from "../theme/global-style";
import theme from "../theme";

const MyApp = ({ Component, pageProps }) => (
	<>
		<GlobalStyle />
		<ThemeProvider theme={theme}>
			<Component {...pageProps} />
		</ThemeProvider>
	</>
);

MyApp.getInitialProps = async (ctx) => {
	const pageProps = await App.getInitialProps(ctx);

	return { pageProps };
};

export default MyApp;
