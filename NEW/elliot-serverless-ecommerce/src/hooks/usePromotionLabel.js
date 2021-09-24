import { useCheckout } from "providers/CheckoutProvider";
import { useCurrency } from "providers/CurrencyProvider";
import PromotionDiscountType from "helpers/constants/PromotionDiscountType";
import getPromotionValidity from "helpers/payment/getPromotionValidity";

const usePromotionLabel = () => {
	const { promotion } = useCheckout();
	const { state: currency } = useCurrency();
	let promotionLabel = null;

	if (promotion && getPromotionValidity(promotion)) {
		promotionLabel = `Discount (${promotion.discountValue}%)`;

		if (promotion.discountType === PromotionDiscountType.AMOUNT) {
			promotionLabel = `Discount (${currency.toUpperCase()})`;
		}
	}

	return promotionLabel;
};

export default usePromotionLabel;
