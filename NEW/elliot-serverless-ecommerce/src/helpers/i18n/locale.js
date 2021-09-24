// Combines the other two utility functions
export const getLocale = (query, defaultLocale) => {
	if (query && query.lang) {
		return getServerLocale(query.lang, defaultLocale);
	} else {
		return getBrowserLocale(defaultLocale);
	}
};

export const getServerLocale = (query, defaultLocale) => {
	const accepts = require("accepts");
	const accept = accepts(query.lang);
	return accept.languages()[0].split("-")[0] || defaultLocale || "en";
};

export const getBrowserLocale = defaultLocale => {
	if (navigator.languages != undefined) {
		return navigator.languages[0].split("-")[0] || defaultLocale || "en";
	} else {
		return navigator.language || defaultLocale || "en";
	}
};
