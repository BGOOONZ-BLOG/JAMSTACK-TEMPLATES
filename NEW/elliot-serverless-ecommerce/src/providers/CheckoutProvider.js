import { useState, useContext, createContext } from "react";

const CheckoutContext = createContext();
const CheckoutDispatchContext = createContext();

export const CheckoutProvider = ({ children, checkout }) => {
	const [orderStatus, setOrderStatus] = useState();

	return (
		<CheckoutDispatchContext.Provider value={{ setOrderStatus }}>
			<CheckoutContext.Provider value={{ ...checkout, orderStatus }}>
				{children}
			</CheckoutContext.Provider>
		</CheckoutDispatchContext.Provider>
	);
};

export const useCheckout = () => useContext(CheckoutContext);
export const useDispatchCheckout = () => useContext(CheckoutDispatchContext);
