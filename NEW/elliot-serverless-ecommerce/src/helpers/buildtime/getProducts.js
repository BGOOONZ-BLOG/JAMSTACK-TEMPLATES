import axios from "axios";
import productsQuery from "queries/products";
import {
	ELLIOT_STORE_FRONT_ID,
	ELLIOT_DOMAIN_ID,
	ELLIOT_API_KEY
} from "config";

export default async () => {
	const { data } = await axios.post(
		"https://admin.elliot.store/api ",
		{
			query: productsQuery,
			variables: {
				id: ELLIOT_STORE_FRONT_ID,
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

	return data.data.node.products;
};
