import { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { FormattedMessage, useIntl } from "react-intl";
import { useCheckout, useDispatchCheckout } from "providers/CheckoutProvider";
import Loader from "components/common/Loader";
import Container from "components/common/Container";
import Button from "components/common/Button";
import heartEmoji from "assets/heart.png";
import { Wrapper, Result, Emoji } from "./styles";

export default ({ email }) => {
	const [loading, setLoading] = useState(false);
	const { orderStatus } = useCheckout();
	const { setOrderStatus } = useDispatchCheckout();
	const { locale } = useIntl();

	const shouldRender = orderStatus === "PAYMENT SUCCESSFUL";

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
					<Emoji>
						<img src={heartEmoji} alt="We love you" />
					</Emoji>
					<Result>
						<h2>We received your order</h2>
						<p>
							Your order has been placed and you will receive an email
							confirmation shortly. If you have any questions regarding your
							order, email us at {email}
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
