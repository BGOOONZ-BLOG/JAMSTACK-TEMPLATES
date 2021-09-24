import React, { useState, useEffect } from "react";
import { loader } from "graphql.macro";
import { useLazyQuery } from "@apollo/react-hooks";
import { Flex, Item } from "react-flex-ready";
import history from "helpers/history";
import { Container, Card } from "./styles";
const getRepositoriesByUsername = loader(
	"../graphql/getRepositoriesByUsername.graphql"
);

const Home = () => {
	const [username, setUsername] = useState("smakosh");
	const [fetchRepos, { loading, error, data }] = useLazyQuery(
		getRepositoriesByUsername
	);

	useEffect(() => {
		fetchRepos({
			variables: {
				username: "smakosh"
			}
		});
	}, [fetchRepos]);

	if (loading) return <h1>Loading...</h1>;
	if (error) return <h1>error...</h1>;

	const handleChange = e => {
		setUsername(e.target.value);
	};

	const handleSubmit = e => {
		e.preventDefault();
		fetchRepos({
			variables: {
				username
			}
		});
	};

	return (
		<Container>
			<form onSubmit={handleSubmit}>
				<input type="text" name="username" onChange={handleChange} />
				<button type="submit">Fetch repositories</button>
			</form>
			<Flex col={4} colTablet={6} colMobile={12}>
				{data &&
					data.repositoryOwner &&
					data.repositoryOwner.repositories &&
					data.repositoryOwner.repositories.edges &&
					data.repositoryOwner.repositories.edges.map(
						({ node: { createdAt, name, id } }) => (
							<Item
								key={id}
								col={4}
								colTablet={6}
								colMobile={12}
								gap={2}
								marginBottom={20}
								stretch
							>
								<Card onClick={() => history.push(`/repo/${name}`)}>
									<h1>{name}</h1>
									<span>Date: {createdAt}</span>
								</Card>
							</Item>
						)
					)}
			</Flex>
		</Container>
	);
};

export default Home;
