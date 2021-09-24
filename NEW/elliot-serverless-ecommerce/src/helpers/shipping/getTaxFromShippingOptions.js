const getTaxAndDutyFromShippingOptions = shippingOptions =>
	shippingOptions.reduce(
		(acc, { tax, duty }) => ({
			tax: parseFloat(tax || 0) + acc.tax,
			duty: parseFloat(duty || 0) + acc.duty
		}),
		{
			tax: 0,
			duty: 0
		}
	);

export default getTaxAndDutyFromShippingOptions;
