import axios from "axios";
import productBySlugQuery from "queries/productBySlug";
import { ELLIOT_API_KEY, ELLIOT_DOMAIN_ID } from "config";

export default async slug => {
	const { data } = await axios.post(
		"https://admin.elliot.store/api ",
		{
			query: productBySlugQuery,
			variables: {
				slug,
				domainId: ELLIOT_DOMAIN_ID
			}
		},
		{
			headers: {
				"Content-Type": "application/json",
				KEY: `KEY ${ELLIOT_API_KEY}`
			}
		}
	);

	return data.data.node.products.edges[0].node;
};
