import getDisplayedShippingOptions from "helpers/shipping/getDisplayedShippingOptions";
import getTaxAndDutyFromShippingOptions from "helpers/shipping/getTaxFromShippingOptions";
import getRawCartPrice from "helpers/payment/getRawCartPrice";
import getSkuTotal from "helpers/payment/getSkuTotal";
import getWalletDisplayItems from "helpers/payment/getWalletDisplayItems";

const stripeOnShippingOptionChange = async ({
	ev,
	shippingOptions,
	checkout,
	cart
}) => {
	const shippingAmount = ev.shippingOption.amount;
	const displayedShippingOption = getDisplayedShippingOptions({
		shippingOptions,
		checkout
	});

	const cartPriceSumRaw = getRawCartPrice(cart);

	const cartPriceSumWithPromo = getSkuTotal(
		cartPriceSumRaw,
		checkout.promotion
	);

	const vendorShippingAmount = Object.values(shippingOptions).reduce(
		(
			acc,
			{ shippingOptions: [{ amount }], freeShipping, flatRate, vendorId }
		) => {
			if (vendorId === displayedShippingOption.vendorId) {
				return acc; // already captured
			}
			return acc + (freeShipping ? 0 : flatRate ? flatRate.value : amount);
		},
		0
	);

	const { tax: orderTax, duty } = getTaxAndDutyFromShippingOptions(
		shippingOptions
	);

	const displayItems = getWalletDisplayItems(cart).concat([
		{
			amount: orderTax,
			label: "Tax",
			pending: false
		},
		{
			amount: shippingAmount + vendorShippingAmount,
			label: "Shipping",
			pending: false
		},
		...(duty
			? [
					{
						amount: duty,
						label: "Duty",
						pending: false
					}
			  ]
			: [])
	]);

	const totalAmount =
		cartPriceSumWithPromo +
		(duty || 0) +
		orderTax +
		shippingAmount +
		vendorShippingAmount;

	ev.updateWith({
		status: "success",
		displayItems,
		total: {
			label: checkout.domain.company.name,
			amount: totalAmount,
			pending: false
		}
	});
};

export default stripeOnShippingOptionChange;
