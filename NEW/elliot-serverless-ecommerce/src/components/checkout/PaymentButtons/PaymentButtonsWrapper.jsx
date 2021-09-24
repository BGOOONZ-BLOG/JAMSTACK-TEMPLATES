import React, { useMemo, useEffect } from "react";
import { injectStripe } from "react-stripe-elements";
import StripePaymentButton from "./WalletPayButtons/index";
import { useCheckout } from "providers/CheckoutProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart } from "providers/CartProvider";
import getRawCartPrice from "helpers/payment/getRawCartPrice";
import getSkuTotal from "helpers/payment/getSkuTotal";
import {
	getSelfCheckoutPaymentRequestInput,
	getShippingPaymentRequestInput
} from "helpers/payment/getPaymentRequestInput";
import ShippingPreference from "helpers/constants/ShippingPreference";
import getWalletDisplayItems from "helpers/payment/getWalletDisplayItems";

const PaymentButtonsWrapper = ({ stripe, addToCartPayload }) => {
	const checkout = useCheckout();
	const { state: displayCurrency } = useCurrency();
	const { state } = useCart();

	const cart = state?.data || [];

	const cartPriceSumRaw = getRawCartPrice(cart);

	const cartPriceSumWithPromo = getSkuTotal(
		cartPriceSumRaw,
		checkout.promotion
	);

	const paymentRequestInput = useMemo(
		() => getShippingPaymentRequestInput(checkout, cart),
		[]
	);

	const paymentRequest = useMemo(
		() => stripe.paymentRequest(paymentRequestInput),
		[]
	);
	// Update remaining details in case of in-store checkout
	useEffect(() => {
		(async () => {
			if (
				checkout.shippingPreference === ShippingPreference.IN_STORE &&
				cart[0]
			) {
				const updatedPaymentRequestInput = getSelfCheckoutPaymentRequestInput({
					checkout,
					skuPrice: cartPriceSumRaw,
					skuTotal: cartPriceSumWithPromo,
					cart,
					displayCurrency: displayCurrency.toUpperCase()
				});

				if (updatedPaymentRequestInput) {
					paymentRequest.update(updatedPaymentRequestInput);
				}
			}
		})();
	}, []);

	// We're splitting this for standard and in-store checkouts, Tax is gotten before the pay modal shows up for in-store
	useEffect(() => {
		if (
			checkout.shippingPreference === ShippingPreference.STANDARD &&
			cart[0]
		) {
			const displayItems = getWalletDisplayItems(cart);
			const currentPaymentRequestInput = {
				currency: checkout.domain.company.currency,
				total: {
					label: checkout.domain.company.name,
					amount: cartPriceSumWithPromo,
					pending: true
				},
				displayItems
			};
			if (currentPaymentRequestInput) {
				paymentRequest.update(currentPaymentRequestInput);
			}
		}
	}, [cartPriceSumWithPromo]);

	return (
		<StripePaymentButton
			addToCartPayload={addToCartPayload}
			cart={cart}
			displayCurrency={displayCurrency}
			checkout={checkout}
			paymentRequest={paymentRequest}
			onOrderLoading={() => console.log("order loading")}
			onOrderSubmitted={status => console.log("order submitted", { status })}
		/>
	);
};

export default injectStripe(PaymentButtonsWrapper);
