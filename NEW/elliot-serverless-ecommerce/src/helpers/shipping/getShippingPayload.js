import ShippingPreference from "helpers/constants/ShippingPreference";

export const getShippingPayload = ({
	checkout,
	cart,
	data,
	token,
	shippingOptions
}) => {
	const payload = {
		checkoutId: checkout.id,
		domainId: checkout.domain.id,
		token: token.id,
		shopper: {
			name: data.name,
			email: data.email,
			phone: data.phone
		},
		cart: cart.map(({ sku: { id }, quantity }) => ({
			skuId: id,
			quantity
		}))
	};

	if (checkout.shippingPreference === ShippingPreference.STANDARD) {
		payload.shopper = {
			...payload.shopper,
			address1: data.shipToAddress || data.line1,
			address2: data.line2,
			city: data.shipToCity || data.city,
			state: data.shipToState || data.state,
			country: data.shipToCountry || data.country,
			zip: data.shipToZipCode || data.postalCode
		};

		const vendorShippingRateTokens = shippingOptions.map(
			({ token, vendorId }) => {
				return {
					shippingRateToken: token,
					id: vendorId
				};
			}
		);

		payload.vendorShippingRateTokens = vendorShippingRateTokens;
	}
	return payload;
};
export default getShippingPayload;
