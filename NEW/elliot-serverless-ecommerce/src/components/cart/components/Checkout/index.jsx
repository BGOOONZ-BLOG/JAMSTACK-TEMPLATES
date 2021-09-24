import Link from "next/link";
import dynamic from "next/dynamic";
import { FormattedMessage, useIntl } from "react-intl";
import { useCart } from "providers/CartProvider";
import Button from "components/common/Button";
import Container from "components/common/Container";
// import Coupon from "components/cart/components/Coupon";
import Shipping from "components/cart/components/Shipping";
const PaymentButtons = dynamic(
	() => import("components/checkout/PaymentButtons"),
	{
		ssr: false
	}
);
import { Wrapper, Actions, Buttons } from "./styles";

const Checkout = () => {
	const { locale } = useIntl();
	const { state } = useCart();

	return (
		<Wrapper as={Container}>
			<Actions>
				<Buttons>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<Button as="a" wide marginBottom={2} variant="outlined">
							<FormattedMessage id="button.continue_shopping" />
						</Button>
					</Link>
					<PaymentButtons />
				</Buttons>
				{/* <Coupon /> */}
			</Actions>
			<Shipping state={state} locale={locale} />
		</Wrapper>
	);
};

export default Checkout;
