import getShippingOptions from "helpers/shipping/getShippingOptions";
import getTaxAndDutyFromShippingOptions from "helpers/shipping/getTaxFromShippingOptions";
import getDisplayedShippingOptions from "helpers/shipping/getDisplayedShippingOptions";
import FlatRateShippingOptions from "helpers/constants/FlatRateShippingOptions";
import getSkuTotal from "helpers/payment/getSkuTotal";
import PromotionDiscountType from "helpers/constants/PromotionDiscountType";
import getRawCartPrice from "helpers/payment/getRawCartPrice";
import getWalletDisplayItems from "helpers/payment/getWalletDisplayItems";
import getPromotionValidity from "helpers/payment/getPromotionValidity";

const stripeOnShippingAddressChange = async ({
	ev,
	setShippingOptions,
	checkout,
	displayCurrency,
	cart
}) => {
	try {
		const shippingOptions = await getShippingOptions({
			shippingDestination: {
				name: "",
				street1: "",
				city: ev.shippingAddress.city,
				state: ev.shippingAddress.region,
				country: ev.shippingAddress.country,
				zip: ev.shippingAddress.postalCode
			},
			cart,
			checkout
		});

		setShippingOptions(shippingOptions);

		const { tax: taxAmount, duty } = getTaxAndDutyFromShippingOptions(
			shippingOptions
		);

		const displayedShippingOption = getDisplayedShippingOptions({
			shippingOptions,
			checkout
		});

		const {
			shippingOptions: displayedShippingOptions
		} = displayedShippingOption;

		let stripeShippingOptions = displayedShippingOptions.map(shippingOption => {
			return {
				id:
					shippingOption.token !== null
						? shippingOption.token
						: `${shippingOption.provider} ${shippingOption.type}`,
				label: `${shippingOption.provider} ${shippingOption.type}`,
				detail:
					shippingOption.days !== null
						? `Arrives in ${shippingOption.days} day(s)`
						: "",
				amount: shippingOption.amount
			};
		});

		const stripeOptionsFreeShipping = [
			{
				id: "free-shipping",
				label: "Free Shipping",
				detail: "Free Shipping",
				amount: 0
			}
		];

		const getWalletFlatRateOptions = ({ type, value }) => [
			{
				id: `${FlatRateShippingOptions.properties[
					type
				].label.toUpperCase()}-flat-rate`,
				label: "Flat Rate",
				detail: FlatRateShippingOptions.properties[type].label.toUpperCase(),
				amount: value
			}
		];

		if (displayedShippingOption.freeShipping) {
			stripeShippingOptions = stripeOptionsFreeShipping;
		} else if (displayedShippingOption.flatRate) {
			const {
				flatRate: { type, value }
			} = displayedShippingOption;
			stripeShippingOptions = getWalletFlatRateOptions({ type, value });
		}

		const shippingAmount = shippingOptions.reduce(
			(acc, { shippingOptions: [{ amount }] }) => parseFloat(amount) + acc,
			0
		);

		const cartPriceSumRaw = getRawCartPrice(cart);

		const cartPriceSumWithPromo = getSkuTotal(
			cartPriceSumRaw,
			checkout.promotion
		);

		const orderTotal =
			cartPriceSumWithPromo + taxAmount + shippingAmount + duty;

		let displayItems = getWalletDisplayItems(cart);

		if (checkout.promotion && getPromotionValidity(checkout.promotion)) {
			const subTotal = cartPriceSumRaw;
			const promotionDiscount = subTotal - cartPriceSumWithPromo;

			const subtotal = {
				amount: subTotal,
				label: "Sub Total"
			};

			let promotionLabel = `Discount (${checkout.promotion.discountValue}%)`;

			if (checkout.promotion.discountType === PromotionDiscountType.AMOUNT) {
				promotionLabel = `Discount (${displayCurrency.toUpperCase()})`;
			}

			const promotion = {
				amount: promotionDiscount,
				label: promotionLabel
			};

			displayItems = [...displayItems, subtotal, promotion];
		}

		const tax = {
			amount: taxAmount,
			label: "Tax",
			pending: false
		};

		const dutyObj = duty && {
			amount: duty,
			label: "Duties",
			pending: false
		};

		const shipping = {
			amount: shippingAmount,
			label: "Shipping",
			pending: false
		};

		displayItems = [...displayItems, tax, shipping];

		if (duty) {
			displayItems.push(dutyObj);
		}

		return ev.updateWith({
			status: "success",
			shippingOptions: stripeShippingOptions,
			displayItems,
			total: {
				label: checkout.domain.company.name,
				amount: orderTotal,
				pending: false
			}
		});
	} catch (error) {
		console.error(error);
		return null;
	}
};

export default stripeOnShippingAddressChange;
