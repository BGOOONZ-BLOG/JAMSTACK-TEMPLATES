import {
	SET_SHIPPING_COST,
	SET_DUTY,
	SET_FREE_SHIPPING,
	SET_FLAT_RATE,
	CLEAR_SHIPPING_INFO,
	SET_TAX,
	BULK_UPDATE
} from "./types";

const initialState = {};

const globalStateReducer = (state = initialState, action) => {
	const initialStateCopy = { ...initialState };
	switch (action.type) {
		case SET_SHIPPING_COST:
			return {
				...state,
				shippingCost: action.payload
			};
		case SET_DUTY:
			return {
				...state,
				duty: action.payload
			};
		case SET_TAX:
			return {
				...state,
				tax: action.payload
			};
		case SET_FREE_SHIPPING:
			return {
				...state,
				freeShipping: action.payload
			};
		case SET_FLAT_RATE:
			return {
				...state,
				flatRateShipping: action.payload
			};
		case BULK_UPDATE:
			return {
				...state,
				...action.payload
			};
		case CLEAR_SHIPPING_INFO:
			delete initialStateCopy.shippingCost;
			delete initialStateCopy.duty;
			delete initialStateCopy.tax;
			delete initialStateCopy.freeShipping;
			delete initialStateCopy.flatRateShipping;
			return initialStateCopy;
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

export default globalStateReducer;
