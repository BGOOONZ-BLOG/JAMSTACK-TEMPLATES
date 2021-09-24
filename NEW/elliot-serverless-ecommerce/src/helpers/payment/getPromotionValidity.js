const getPromotionValidity = promotion => {
	const start = Date.parse(promotion.startDatetime);
	const end = promotion.endDatetime
		? Date.parse(promotion.endDatetime)
		: Infinity;
	const now = Date.now();
	if (now >= start && now <= end) {
		return true;
	}
	return false;
};

export default getPromotionValidity;
