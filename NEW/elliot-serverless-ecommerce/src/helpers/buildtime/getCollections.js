import axios from "axios";
import collectionsQuery from "queries/collections";
import buildCache from "helpers/buildtime/buildCache";
import {
	ELLIOT_STORE_FRONT_ID,
	ELLIOT_DOMAIN_ID,
	ELLIOT_API_KEY
} from "config";

export default async () => {
	return buildCache("getCollections", () =>
		axios
			.post(
				"https://admin.elliot.store/api ",
				{
					query: collectionsQuery,
					variables: {
						domainId: ELLIOT_DOMAIN_ID,
						checkoutId: ELLIOT_STORE_FRONT_ID
					}
				},
				{
					headers: {
						"Content-Type": "application/json",
						KEY: `KEY ${ELLIOT_API_KEY}`
					}
				}
			)
			.then(res => res.data.data.node.collections)
	);
};
