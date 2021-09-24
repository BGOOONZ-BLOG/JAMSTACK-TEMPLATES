import { getCurrencyAbbreviation } from "country-currency-map";
import places from "helpers/shipping/places.json";

const generateLocationObjectConstruct = ({
	inputType,
	addressLine1,
	city,
	state,
	country,
	currency,
	formattedZip
}) => {
	switch (inputType) {
		case "SHIP_TO":
			return {
				addressLine1_optional: addressLine1,
				city_optional: city,
				state_optional: state,
				country_optional: country,
				zipCode_optional: formattedZip,
				currency
			};
		default:
			return {
				addressLine1,
				city,
				state,
				country,
				zipCode: formattedZip,
				currency
			};
	}
};

export default (place, optional) => {
	let addressLine1 = "";
	let city = "";
	let state = "";
	let country = "";
	let zipCode = "";
	let zipCodeSuffix = "";
	let currency = "";

	if (place.address_components) {
		const streetNumberComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.streetNumber)
		)[0];
		const routeComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.route)
		)[0];
		let localityComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.locality)
		)[0];
		if (!localityComponent) {
			localityComponent = place.address_components.filter(ac =>
				ac.types.includes(places.types.sublocality)
			)[0];
		}
		const stateComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.state)
		)[0];
		const countryComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.country)
		)[0];
		const zipCodeComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.postalCode)
		)[0];
		const zipCodeSuffixComponent = place.address_components.filter(ac =>
			ac.types.includes(places.types.postalCodeSuffix)
		)[0];
		const countryLong = countryComponent && countryComponent.long_name;

		addressLine1 = [
			(streetNumberComponent && streetNumberComponent.short_name) || "",
			(routeComponent && routeComponent.short_name) || ""
		].join(" ");
		city = (localityComponent && localityComponent.short_name) || "";
		state = (stateComponent && stateComponent.short_name) || "";
		country = (countryComponent && countryComponent.short_name) || "";
		zipCode = (zipCodeComponent && zipCodeComponent.short_name) || "";
		zipCodeSuffix =
			(zipCodeSuffixComponent && zipCodeSuffixComponent.short_name) || "";
		if (countryLong) {
			currency = getCurrencyAbbreviation(countryLong);
		}
	}
	const formattedZip =
		zipCode && zipCodeSuffix ? `${zipCode}-${zipCodeSuffix}` : zipCode;

	const locationObjectConstruct = generateLocationObjectConstruct({
		inputType: optional ? "SHIP_TO" : null,
		addressLine1,
		city,
		country,
		currency,
		formattedZip,
		state
	});

	return locationObjectConstruct;
};
