import React, { useReducer, useContext, createContext } from "react";
import cartReducer from "reducers/cartReducer";

const CartContext = createContext();
const CartDispatchContext = createContext();

export const CartProvider = ({ children }) => {
	const [state, dispatch] = useReducer(cartReducer, []);

	return (
		<CartDispatchContext.Provider value={{ dispatch }}>
			<CartContext.Provider value={{ state }}>{children}</CartContext.Provider>
		</CartDispatchContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
