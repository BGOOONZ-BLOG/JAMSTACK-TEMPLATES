import axios from "axios";
import legalQuery from "queries/legal";
import { ELLIOT_STORE_FRONT_ID, ELLIOT_API_KEY } from "config";

export default async () => {
	const {
		data: {
			data: {
				node: {
					domain: { company }
				}
			}
		}
	} = await axios.post(
		"https://admin.elliot.store/api ",
		{
			query: legalQuery,
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

	return company;
};
