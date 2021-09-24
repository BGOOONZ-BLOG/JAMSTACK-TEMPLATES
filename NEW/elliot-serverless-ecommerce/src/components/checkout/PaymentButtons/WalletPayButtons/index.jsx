import React from "react";
import { detect } from "detect-browser";
import WalletPayBuyButton from "../WalletPayButton";
import stripeOnToken from "../stripeOnToken";
import stripeOnShippingOptionChange from "../stripeOnShippingOptionChange";
import stripeOnShippingAddressChange from "../stripeOnShippingAddressChange";
import { GooglePayIcon, ApplePayIcon } from "components/common/Icons/";
import { IconWrapper } from "./styles";

const browser = detect();

class WalletPayButtons extends React.Component {
	constructor(props) {
		super(props);
		props.paymentRequest.on("token", ({ complete, token, ...data }) => {
			const {
				onOrderLoading,
				onOrderSubmitted,
				paymentRequest,
				cart,
				checkout
			} = this.props;
			const { shippingOptions } = this.state;
			stripeOnToken({
				onOrderSubmitted,
				paymentRequest,
				onOrderLoading,
				token,
				data,
				shippingOptions,
				complete,
				cart,
				checkout
			});
		});

		props.paymentRequest.canMakePayment().then(result => {
			const canMakePayment = !!result;
			this.setState({
				canMakePayment
			});
		});

		props.paymentRequest.on("shippingoptionchange", ev => {
			const { shippingOptions } = this.state;
			const { cart, checkout } = this.props;
			stripeOnShippingOptionChange({
				ev,
				shippingOptions,
				checkout,
				cart
			});
		});

		props.paymentRequest.on("shippingaddresschange", ev => {
			const { checkout, displayCurrency, cart } = this.props;
			stripeOnShippingAddressChange({
				ev,
				setShippingOptions: shippingOptions =>
					this.setState({ shippingOptions }),
				checkout,
				displayCurrency,
				cart
			});
		});

		this.state = {
			canMakePayment: false,
			orderTax: 0
		};
	}

	render() {
		const { addToCartPayload } = this.props;
		if (this.state.canMakePayment && browser && browser.name === "chrome") {
			return (
				<WalletPayBuyButton
					paymentRequest={this.props.paymentRequest}
					orderTax={this.state.orderTax}
					setOrderTax={orderTax => this.setState({ orderTax })}
					addToCartPayload={addToCartPayload}
				>
					<IconWrapper>
						<GooglePayIcon />
					</IconWrapper>
				</WalletPayBuyButton>
			);
		}
		if (
			this.state.canMakePayment &&
			browser &&
			(browser.name === "safari" ||
				browser.name === "ios" ||
				browser.name === "ios-webview" ||
				browser.name === "instagram" ||
				browser.name === "facebook")
		) {
			return (
				<WalletPayBuyButton
					paymentRequest={this.props.paymentRequest}
					orderTax={this.state.orderTax}
					setOrderTax={orderTax => this.setState({ orderTax })}
					addToCartPayload={addToCartPayload}
				>
					<IconWrapper paddingLeft={0.5}>
						<ApplePayIcon />
					</IconWrapper>
				</WalletPayBuyButton>
			);
		}
		return null;
	}
}

export default WalletPayButtons;
