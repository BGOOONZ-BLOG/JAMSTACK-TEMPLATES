const initialState = [];

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "ADD_TO_CART":
			return {
				...state,
				data: state.data ? [...state.data, action.payload] : [action.payload]
			};
		case "REMOVE_FROM_CART":
			return {
				...state,
				data: state.data.filter(({ sku }) => sku.id !== action.skuId)
			};
		case "ADD_CUSTOM_QUANTITY":
			return {
				...state,
				data: state.data.map(item =>
					item.sku.id === action.skuId
						? {
								...item,
								quantity: item.quantity + action.quantity
						  }
						: item
				)
			};
		case "ADD_QUANTITY":
			return {
				...state,
				data: state.data.map(item =>
					item.sku.id === action.skuId
						? {
								...item,
								quantity: item.quantity + 1
						  }
						: item
				)
			};
		case "SUBTRACT_QUANTITY":
			return {
				...state,
				data: state.data.map(item =>
					item.sku.id === action.skuId
						? {
								...item,
								quantity: item.quantity - 1
						  }
						: item
				)
			};
		case "CLEAR_CART":
			return initialState;
		default:
			throw new Error(`Unknown action: ${action.type}`);
	}
};

export default cartReducer;
