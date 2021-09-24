import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { useCheckout, useDispatchCheckout } from "providers/CheckoutProvider";
import Loader from "components/common/Loader";
import { OrderFailedIcon } from "components/common/Icons/OrderFailedIcon";
import Container from "components/common/Container";
import Button from "components/common/Button";
import { Wrapper, Result } from "./styles";

export default () => {
	const [loading, setLoading] = useState(true);
	const { orderStatus } = useCheckout();
	const { setOrderStatus } = useDispatchCheckout();
	const { locale } = useIntl();

	const shouldRender = orderStatus === "PAYMENT FAILED";

	useEffect(() => {
		setTimeout(() => {
			if (!shouldRender) {
				return Router.push({
					pathname: `/${locale}`
				});
			} else {
				setLoading(false);
			}
		}, 8000);
		return () => {
			setOrderStatus(null);
		};
	}, []);

	return (
		<Wrapper as={Container}>
			{loading ? (
				<Loader />
			) : (
				<>
					<OrderFailedIcon width={120} height={120} />
					<Result>
						<h2>Payment failed</h2>
						<p>
							Your credit card was not charged in error. If you believe this is
							a mistake, please try purchasing the product again
						</p>
					</Result>
					<Link href="/[lang]/" as={`/${locale}/`}>
						<Button as="a" variant="primary">
							<FormattedMessage id="button.back_to_shop" />
						</Button>
					</Link>
				</>
			)}
		</Wrapper>
	);
};
