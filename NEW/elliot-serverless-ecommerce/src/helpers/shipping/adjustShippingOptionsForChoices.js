import getDomainOwnerProfileId from "../payment/getDomainOwnerProfileId";

const adjustShippingOptionsForChoices = ({
	displayedShippingOptions,
	shippingOptions,
	selectedShippingOptionIndex,
	checkout
}) => {
	const domainOwnerProfileId = getDomainOwnerProfileId(checkout);
	const adjustedShippingOptions = shippingOptions.map(
		({ shippingOptions: [firstShippingOption], vendorId }) => {
			const isDomainOwner = domainOwnerProfileId === vendorId;
			const { token } = isDomainOwner
				? displayedShippingOptions[selectedShippingOptionIndex]
				: firstShippingOption;

			return {
				token,
				vendorId
			};
		}
	);

	return adjustedShippingOptions;
};

export default adjustShippingOptionsForChoices;
