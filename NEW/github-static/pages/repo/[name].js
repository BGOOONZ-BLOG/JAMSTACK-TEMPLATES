import Container from "../../components/common/Container";
import Repo from "../../components/Repo";

const RepoPage = ({ data }) => (
	<Container>
		<Repo {...data} />
	</Container>
);

export const getStaticPaths = () => ({
	paths: [],
	fallback: true,
});

export const getStaticProps = async ({ params: { name } }) => {
	const res = await fetch("https://api.github.com/graphql", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
		},
		body: JSON.stringify({
			query: `{
				repository(name: "${name}", owner: "smakosh") {
					name
					url
					forks {
						totalCount
					}
					stargazers {
						totalCount
					}
				}
			}`,
		}),
	});

	const { data } = await res.json();

	return {
		props: {
			data: data.repository,
		},
		revalidate: 1,
	};
};

export default RepoPage;
