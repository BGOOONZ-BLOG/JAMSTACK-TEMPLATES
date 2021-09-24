import React from "react";
import { loader } from "graphql.macro";
import { useQuery } from "@apollo/react-hooks";
import { Container, Card } from "./styles";
const getRepositoryByNameAndOwnerName = loader(
	"../graphql/getRepositoryByNameAndOwnerName.graphql"
);

const Repository = ({
	match: {
		params: { name }
	}
}) => {
	const { loading, error, data } = useQuery(getRepositoryByNameAndOwnerName, {
		variables: {
			username: "smakosh",
			repoName: name
		}
	});

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>error...</h1>;

	return (
		<Container>
			<Card>
				<h1>{data.repository.name}</h1>
				<p>{data.repository.description}</p>
				<span>Stars: {data.repository.stargazers.totalCount}</span>
			</Card>
		</Container>
	);
};

export default Repository;
