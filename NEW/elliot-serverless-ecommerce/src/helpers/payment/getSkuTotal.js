import PromotionDiscountType from "helpers/constants/PromotionDiscountType";
import getPromotionValidity from "./getPromotionValidity";

const getSkuTotal = (orderTotal, promotion) => {
	let updatedOrderTotal = orderTotal;
	if (promotion && getPromotionValidity(promotion)) {
		if (promotion.discountType === PromotionDiscountType.PERCENTAGE) {
			updatedOrderTotal = parseFloat(
				(orderTotal * (100 - promotion.discountValue)) / 100
			);
		} else {
			updatedOrderTotal = orderTotal - promotion.discountValue;
		}
	}
	if (updatedOrderTotal < 0) {
		return 0;
	}

	return updatedOrderTotal;
};

export default getSkuTotal;
