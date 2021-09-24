import ShippingPreference from "helpers/constants/ShippingPreference";
import getSkuPrice from "./getSkuPrice";
import getWalletDisplayItems from "./getWalletDisplayItems";
import getPromotionValidity from "helpers/payment/getPromotionValidity";
import PromotionDiscountType from "helpers/constants/PromotionDiscountType";

export const getShippingPaymentRequestInput = (checkout, cart) => ({
	country: checkout.shipFromLocation.country,
	currency: checkout.domain.company.currency,
	total: {
		label: checkout.domain.company.name,
		amount: getSkuPrice(cart[0]?.sku),
		pending: true
	},
	displayItems: getWalletDisplayItems(cart),
	requestShipping: checkout.shippingPreference === ShippingPreference.STANDARD,
	requestPayerEmail: true,
	requestPayerPhone: true,
	requestPayerName: true
});

export const getSelfCheckoutPaymentRequestInput = ({
	checkout,
	cart,
	skuPrice,
	skuTotal,
	displayCurrency,
	tax
}) => {
	let displayItems = getWalletDisplayItems(cart);

	if (checkout.promotion && getPromotionValidity(checkout.promotion)) {
		const promotionDiscount = skuPrice - skuTotal;

		const subtotal = {
			amount: skuPrice,
			label: "Sub Total"
		};

		let promotionLabel = `Discount (${checkout.promotion.discountValue}%)`;

		if (checkout.promotion.discountType === PromotionDiscountType.AMOUNT) {
			promotionLabel = `Discount (${displayCurrency})`;
		}

		const promotion = {
			amount: promotionDiscount,
			label: promotionLabel
		};

		displayItems = [...displayItems, subtotal, promotion];
	}

	if (tax) {
		const taxItem = {
			amount: tax,
			label: "Tax",
			pending: false
		};
		displayItems = [...displayItems, taxItem];
	}
	const paymentRequestInput = {
		currency: checkout.domain.company.currency,
		total: {
			label: checkout.domain.company.name,
			amount: skuTotal,
			pending: true
		},
		displayItems,
		shippingOptions: []
	};

	return paymentRequestInput;
};
