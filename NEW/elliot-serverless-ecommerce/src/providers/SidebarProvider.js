import React, { useReducer, useContext, createContext } from "react";
import sidebarReducer from "reducers/sidebarReducer";

const SidebarContext = createContext();
const SidebarDispatchContext = createContext();

export const SidebarProvider = ({ children }) => {
	const [state, dispatch] = useReducer(sidebarReducer, []);

	return (
		<SidebarDispatchContext.Provider value={{ dispatch }}>
			<SidebarContext.Provider value={{ state }}>
				{children}
			</SidebarContext.Provider>
		</SidebarDispatchContext.Provider>
	);
};

export const useSidebar = () => useContext(SidebarContext);
export const useDispatchSidebar = () => useContext(SidebarDispatchContext);
