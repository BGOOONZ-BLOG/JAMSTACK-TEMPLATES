import fetch from "node-fetch";
import ShippingPreference from "helpers/constants/ShippingPreference";
import OrderStatus from "helpers/constants/OrderStatus";
import getShippingPayload from "helpers/shipping/getShippingPayload";

const stripeOnToken = async ({
	onOrderSubmitted,
	paymentRequest,
	onOrderLoading,
	token,
	data,
	shippingOptions,
	complete,
	checkout,
	cart
}) => {
	try {
		const functionURL =
			checkout.shipping_preference === ShippingPreference.STANDARD
				? "https://us-east1-elliot-192017.cloudfunctions.net/createOrderShipping"
				: "https://us-east1-elliot-192017.cloudfunctions.net/createOrderSelfCheckout";

		const { payerEmail: email, payerPhone: phone } = data;

		let line1;
		let line2;
		let city;
		let state;
		let country;
		let postalCode;
		let name;

		if (data.shippingAddress) {
			({
				shippingAddress: {
					addressLine: [line1, line2 = ""],
					city,
					region: state,
					country,
					postalCode,
					recipient: name
				}
			} = data);
		} else {
			name = data.payerName;
		}

		const payloadData = {
			email,
			line1,
			line2,
			city,
			state,
			country,
			postalCode,
			phone,
			name
		};

		const payload = getShippingPayload({
			checkout,
			cart,
			data: payloadData,
			token,
			shippingOptions
		});

		onOrderLoading();
		complete("success");
		const res = await fetch(functionURL, {
			method: "post",
			body: JSON.stringify(payload),
			headers: { "Content-Type": "application/json" }
		});

		onOrderSubmitted(
			res.status === 200 ? OrderStatus.SUCCEEDED : OrderStatus.FAILED
		);
		paymentRequest.update({ shippingOptions: [] });
	} catch (error) {
		onOrderSubmitted(OrderStatus.FAILED);
		console.error(error);
	}
};

export default stripeOnToken;
