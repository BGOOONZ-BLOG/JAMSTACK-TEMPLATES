const getSkuPrice = sku => {
	if (!sku) return 0;
	const basePrice = sku.basePrice;
	const salePrice = sku.salePrice;

	return salePrice || basePrice;
};

export default getSkuPrice;
