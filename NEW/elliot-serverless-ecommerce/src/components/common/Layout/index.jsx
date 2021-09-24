import Head from "next/head";
import Header from "components/theme/Header";
import Footer from "components/theme/Footer";
import { useTheme } from "styled-components";
import GlobalStyle from "components/theme/global-style";
import { Wrapper } from "./styles";

export default ({ children, collections, seoDetails, checkout, legal }) => {
	const { fonts } = useTheme();

	return (
		<>
			<Head>
				{/* TODO: pass custom font from theme */}
				<link
					href={`https://fonts.googleapis.com/css?family=${fonts.primary.replace(
						" ",
						"+"
					)}:300,400,500|${fonts.primary.replace(
						" ",
						"+"
					)}:400,700&display=fallback`}
					rel="stylesheet"
				/>
			</Head>
			<GlobalStyle />
			<>
				<Header
					collections={collections}
					seoDetails={seoDetails}
					checkout={checkout}
					legal={legal}
				/>
				<Wrapper>{children}</Wrapper>
				<Footer
					collections={collections}
					seoDetails={seoDetails}
					legal={legal}
				/>
			</>
		</>
	);
};
