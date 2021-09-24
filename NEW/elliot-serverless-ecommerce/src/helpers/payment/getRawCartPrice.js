const getRawCartPrice = cart =>
	cart.reduce(
		(
			acc,
			{
				sku: { salePrice: salePrice, basePrice: basePrice },
				quantity: iQuantity
			}
		) => acc + (salePrice || basePrice) * iQuantity,
		0
	);

export default getRawCartPrice;
