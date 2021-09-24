import Link from "next/link";
import Repos from "../components/Repos";
import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const Home = ({ data }) => (
	<Container>
		<SEO />
		<h1>SSG</h1>
		<Repos repositories={data} />
	</Container>
);

export const getStaticProps = async () => {
	const query = `{
		viewer {
			repositories(ownerAffiliations: OWNER, first: 5, orderBy: {field: STARGAZERS, direction: DESC}) {
				totalCount
				nodes {
					name
					url
					forks {
						totalCount
					}
					stargazers {
						totalCount
					}
				}
			}
		}
	}`;

	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
		},
		body: JSON.stringify({
			query,
		}),
	});

	const { data } = await res.json();

	return {
		props: {
			data: data.viewer.repositories,
		},
		revalidate: 1,
	};
};

export default Home;
