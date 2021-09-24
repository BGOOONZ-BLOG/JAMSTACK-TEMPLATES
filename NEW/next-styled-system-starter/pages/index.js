import Head from "next/head";
import styled, { useTheme } from "styled-components";
import { color, layout, space } from "styled-system";

const Box = styled.div`
	${color}
	${layout}
  ${space}
`;

export default function Home() {
	const theme = useTheme();

	return (
		<Box color={theme.colors.primary} bg="#eee" maxWidth={1024} m="auto">
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<h1>Hello world</h1>
		</Box>
	);
}
