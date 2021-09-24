const getMinimalCart = cart =>
	cart.map(({ sku: { id: skuId }, quantity }) => ({ skuId, quantity }));

export default getMinimalCart;
