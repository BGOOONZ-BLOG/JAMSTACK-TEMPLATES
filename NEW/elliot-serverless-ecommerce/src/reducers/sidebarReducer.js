const initialState = {
	open: false,
	content: ""
};

const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case "OPEN_SIDEBAR":
			return {
				...state,
				open: true,
				content: action.content
			};
		case "CLOSE_SIDEBAR":
			return {
				...state,
				open: false,
				content: setTimeout(() => action.content, 200)
			};
		default:
			return {
				state
			};
	}
};

export default cartReducer;
