import getTotal from "helpers/payment/getTotal";
import subtractPromoFromTotal from "helpers/payment/subtractPromoFromTotal";

const useOrderSummary = ({
	shippingTotal = 0,
	exchangeRate,
	cart,
	promotion
}) => {
	const orderTotal = getTotal(cart, exchangeRate);
	const orderTotalAfterPromo = subtractPromoFromTotal({
		orderTotal,
		exchangeRate,
		promotion
	});

	const payload = {
		orderTotal: parseFloat(orderTotalAfterPromo) + parseFloat(shippingTotal),
		subTotal: orderTotal,
		promotion: parseFloat(orderTotal) - parseFloat(orderTotalAfterPromo)
	};

	return payload;
};

export default useOrderSummary;
