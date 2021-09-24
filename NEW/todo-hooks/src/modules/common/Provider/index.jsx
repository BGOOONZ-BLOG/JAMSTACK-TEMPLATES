import React, { useReducer, useEffect } from "react";
import { Context } from "../Context";
import reducer from "./reducer";
import themeReducer from "./themeReducer";

const Provider = ({ children }) => {
	const [theme, toggleTheme] = useReducer(themeReducer, "light");
	const [tasks, dispatch] = useReducer(reducer, []);

	useEffect(() => {
		document.title = `${theme} Mode`;
		if (theme === "light") {
			document.body.style.background = "#fff";
		} else {
			document.body.style.background = "#000";
		}
	});

	return (
		<Context.Provider
			value={{
				theme,
				toggleTheme,
				tasks,
				dispatch
			}}
		>
			{children}
		</Context.Provider>
	);
};

export { Provider };
