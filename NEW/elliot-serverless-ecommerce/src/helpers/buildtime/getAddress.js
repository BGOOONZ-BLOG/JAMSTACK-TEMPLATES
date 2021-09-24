import axios from "axios";
import addressQuery from "queries/address";
import { ELLIOT_STORE_FRONT_ID, ELLIOT_API_KEY } from "config";

export default async () => {
	const {
		data: {
			data: {
				node: {
					domain: {
						company: { address }
					}
				}
			}
		}
	} = await axios.post(
		"https://admin.elliot.store/api ",
		{
			query: addressQuery,
			variables: {
				id: ELLIOT_STORE_FRONT_ID
			}
		},
		{
			headers: {
				"Content-Type": "application/json",
				KEY: `KEY ${ELLIOT_API_KEY}`
			}
		}
	);

	return address;
};
