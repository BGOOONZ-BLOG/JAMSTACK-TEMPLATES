import { useState, useEffect } from "react";
import { Elements, StripeProvider } from "react-stripe-elements";
import CreditCardForm from "components/checkout/OrderCheckout/components/CreditCardForm";

const PaymentForm = ({ checkout, promotion }) => {
	const [stripe, setStripe] = useState(null);

	useEffect(() => {
		setStripe(window.Stripe("pk_live_yFYFl6mGLlN0IXbAUBInr3gl"));
	}, []);

	return (
		<StripeProvider stripe={stripe} checkout={checkout}>
			<Elements>
				<CreditCardForm checkout={checkout} promotion={promotion} />
			</Elements>
		</StripeProvider>
	);
};

export default PaymentForm;
