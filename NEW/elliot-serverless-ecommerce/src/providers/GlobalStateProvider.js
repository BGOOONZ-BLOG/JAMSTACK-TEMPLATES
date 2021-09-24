import React, { useReducer, useContext, createContext } from "react";
import globalStateReducer from "reducers/globalStateReducer.js";

const GlobalStateContext = createContext();
const GlobalStateDispatchContext = createContext();

export const GlobalStateProvider = ({ children }) => {
	const [state, dispatch] = useReducer(globalStateReducer, {});

	return (
		<GlobalStateDispatchContext.Provider value={{ dispatch }}>
			<GlobalStateContext.Provider value={{ state }}>
				{children}
			</GlobalStateContext.Provider>
		</GlobalStateDispatchContext.Provider>
	);
};

export const useGlobalState = () => useContext(GlobalStateContext);
export const useDispatchGlobalState = () =>
	useContext(GlobalStateDispatchContext);
