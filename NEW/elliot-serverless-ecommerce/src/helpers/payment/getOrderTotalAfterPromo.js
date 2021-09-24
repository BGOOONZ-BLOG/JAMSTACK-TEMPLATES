import PromotionDiscountType from "helpers/constants/PromotionDiscountType";

const getOrderAfterPromo = ({ orderTotal, promotion }) => {
	let updatedOrderTotal = orderTotal;
	if (promotion.discountType === PromotionDiscountType.PERCENTAGE) {
		updatedOrderTotal = parseFloat(
			(orderTotal * (100 - promotion.discountValue)) / 100
		);
	} else {
		updatedOrderTotal = orderTotal - promotion.discountValue;
	}

	return updatedOrderTotal;
};

export default getOrderAfterPromo;
