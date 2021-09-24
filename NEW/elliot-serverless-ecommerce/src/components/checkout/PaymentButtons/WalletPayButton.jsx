import { useState, useEffect } from "react";
import Loader from "components/common/Loader";
import ShippingPreference from "helpers/constants/ShippingPreference";
import { useCart } from "providers/CartProvider";
import { useCheckout } from "providers/CheckoutProvider";
import getTaxAndDutyFromShippingOptions from "helpers/shipping/getTaxFromShippingOptions";
import getShippingOptions from "helpers/shipping/getShippingOptions";
import Button from "components/common/Button";
import { FormattedMessage } from "react-intl";
import { addToCart } from "components/cart/actions";
import isEmpty from "helpers/isEmpty";
import {
	ButtonGroup,
	CustomButton
} from "components/product/components/Details/styles";

const WalletPayBuyButton = ({
	children,
	paymentRequest,
	orderTax,
	setOrderTax,
	addToCartPayload
}) => {
	const [loading, setLoading] = useState(false);
	const [listenForCartUpdate, setCartUpdateListening] = useState(false);
	const [listenForTaxUpdate, setTaxUpdateListening] = useState(false);

	const checkout = useCheckout();
	const {
		state: { data: cart = [] }
	} = useCart();

	const buttonContent = loading ? (
		<Loader />
	) : (
		<>
			<FormattedMessage id="button.buy_now_with" />
			{children}
		</>
	);

	const getTax = async () => {
		const taxPayload = await getShippingOptions({
			shippingDestination: {
				address1: checkout.shipFromLocation.address1,
				address2: checkout.shipFromLocation.address2 || "",
				city: checkout.shipFromLocation.city,
				state: checkout.shipFromLocation.state,
				zip: checkout.shipFromLocation.zipCode,
				country: checkout.shipFromLocation.country
			},
			cart,
			checkout
		});

		const { tax: taxAmount } = getTaxAndDutyFromShippingOptions(taxPayload);
		setOrderTax(taxAmount);
		return taxAmount;
	};

	const paymentRequestActions = async () => {
		if (checkout.shippingPreference === ShippingPreference.IN_STORE) {
			// We only need tax for in-store checkouts so we don't need input from the client before we run this
			setLoading(true);
			await getTax();
			setLoading(false);
		}
	};

	useEffect(() => {
		if (listenForTaxUpdate && orderTax) {
			setTaxUpdateListening(false);
			setTimeout(() => {
				paymentRequest.show();
			}, 1);
		}
	}, [orderTax, listenForTaxUpdate]);

	useEffect(() => {
		if (listenForCartUpdate && cart.length === 1) {
			(async () => {
				setCartUpdateListening(false);
				if (checkout.shippingPreference === ShippingPreference.IN_STORE) {
					setTaxUpdateListening(true);
					await paymentRequestActions();
				} else {
					setTimeout(() => {
						paymentRequest.show();
					}, 1);
				}
			})();
		}
	}, [listenForCartUpdate, isEmpty(cart)]);

	const handleClick = async () => {
		if (isEmpty(cart) && addToCartPayload) {
			addToCart(addToCartPayload);
			setCartUpdateListening(true);
		} else if (checkout.shippingPreference === ShippingPreference.IN_STORE) {
			setTaxUpdateListening(true);
			await paymentRequestActions();
		} else {
			paymentRequest.show();
		}
	};

	return (
		<ButtonGroup>
			<CustomButton
				as={Button}
				disabled={loading}
				onClick={handleClick}
				type="button"
				variant="primary"
				wide
			>
				{buttonContent}
			</CustomButton>
		</ButtonGroup>
	);
};

export default WalletPayBuyButton;
