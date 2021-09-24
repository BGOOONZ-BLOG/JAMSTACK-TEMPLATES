import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import PaymentButtonsRaw from "./PaymentButtonsWrapper";

const PaymentButtons = ({ addToCartPayload }) => (
	<StripeProvider apiKey="pk_live_yFYFl6mGLlN0IXbAUBInr3gl">
		<Elements>
			<PaymentButtonsRaw addToCartPayload={addToCartPayload} />
		</Elements>
	</StripeProvider>
);

export default PaymentButtons;
