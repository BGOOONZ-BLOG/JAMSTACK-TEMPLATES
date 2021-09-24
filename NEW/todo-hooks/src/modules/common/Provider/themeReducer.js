export default (theme, action) => {
	switch (action.type) {
		case "TOGGLE_THEME":
			return theme === "light" ? "dark" : "light";
		default:
			return theme;
	}
};
