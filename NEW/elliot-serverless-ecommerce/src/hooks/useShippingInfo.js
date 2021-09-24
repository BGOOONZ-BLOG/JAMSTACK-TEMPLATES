import { useGlobalState } from "providers/GlobalStateProvider";
import formatMoney from "helpers/payment/formatMoney";
import { useCurrency } from "providers/CurrencyProvider";

const useShippingInfo = () => {
	const { exchangeRate } = useCurrency();
	const { state: globalState } = useGlobalState();

	let { shippingCost } = globalState;

	const { duty = 0, tax = 0, flatRateShipping, freeShipping } = globalState;

	const shippingInfoExists = parseFloat(shippingCost) > 0;

	if (!shippingInfoExists) {
		return {};
	}

	if (flatRateShipping) {
		shippingCost = parseFloat(flatRateShipping.value);
	}

	if (freeShipping) {
		shippingCost = 0;
	}

	let shippingTotal =
		parseFloat(duty) + parseFloat(tax) + parseFloat(shippingCost);
	shippingTotal = formatMoney({ sum: shippingTotal, exchangeRate });

	return {
		duty,
		tax,
		shippingCost,
		shippingTotal
	};
};

export default useShippingInfo;
