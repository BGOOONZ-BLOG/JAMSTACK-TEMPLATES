import React from "react";
import fetch from "unfetch";
import { ApolloProvider as Provider } from "react-apollo";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { onError } from "apollo-link-error";
import { createUploadLink } from "apollo-upload-client";

export default ({ children }) => {
	const httpLink = createUploadLink({
		fetch,
		uri: process.env.REACT_APP_GITHUB_API
	});

	const errorLink = onError(({ networkError, graphQLErrors }) => {
		if (graphQLErrors) {
			console.log(
				"There was an error while trying to connect to the server, please try again"
			);
			graphQLErrors.map(({ message, locations, path }) =>
				console.log(
					`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
				)
			);
		}
		if (networkError) {
			console.log(`[Network err]: Message: ${networkError}`);
		}
	});

	const authLink = setContext((_, { headers }) => ({
		headers: {
			Authorization: `bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
			...headers
		}
	}));

	const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

	const client = new ApolloClient({
		cache: new InMemoryCache(),
		link
	});
	return <Provider client={client}>{children}</Provider>;
};
