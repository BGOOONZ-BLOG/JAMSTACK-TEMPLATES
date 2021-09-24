import getPromotionValidity from "helpers/payment/getPromotionValidity";
import getOrderAfterPromo from "helpers/payment/getOrderTotalAfterPromo";

const subtractPromoFromTotal = ({ orderTotal, exchangeRate, promotion }) => {
	let updatedOrderTotal = orderTotal;
	if (promotion && getPromotionValidity(promotion)) {
		updatedOrderTotal =
			getOrderAfterPromo({ orderTotal, promotion }) * exchangeRate;
	}
	if (updatedOrderTotal < 0) {
		return 0;
	}

	return updatedOrderTotal;
};

export default subtractPromoFromTotal;
