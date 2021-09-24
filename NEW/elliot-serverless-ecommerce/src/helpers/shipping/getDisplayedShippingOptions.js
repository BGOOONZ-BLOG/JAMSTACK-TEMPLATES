import getDomainOwnerProfileId from "../payment/getDomainOwnerProfileId";

const getDisplayedShippingOptions = ({
	shippingOptions: perVendorShippingOptions,
	checkout
}) => {
	if (perVendorShippingOptions && perVendorShippingOptions[0]) {
		const domainOwnerShippingOption = perVendorShippingOptions.find(
			({ vendorId }) => vendorId === getDomainOwnerProfileId(checkout)
		);
		const shippingOption =
			domainOwnerShippingOption || perVendorShippingOptions[0];
		return shippingOption;
	}
	return {};
};

export default getDisplayedShippingOptions;
