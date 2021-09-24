import axios from "axios";
import checkoutQuery from "queries/checkout";
import buildCache from "helpers/buildtime/buildCache";
import {
	ELLIOT_STORE_FRONT_ID,
	ELLIOT_DOMAIN_ID,
	ELLIOT_API_KEY
} from "config";

export default async () => {
	return buildCache("getCheckout", () =>
		axios
			.post(
				"https://admin.elliot.store/api ",
				{
					query: checkoutQuery,
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
			)
			.then(res => res.data.data.node)
	);
};
