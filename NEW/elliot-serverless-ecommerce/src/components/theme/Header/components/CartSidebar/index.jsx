import Link from "next/link";
import dynamic from "next/dynamic";
import { FormattedMessage, useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { useCheckout } from "providers/CheckoutProvider";
import { CancelIcon, EmptyCart } from "components/common/Icons";
import Button from "components/common/Button";
import Swatch from "components/common/Swatch";
import { removeFromCart } from "components/cart/actions";
import formatMoney from "helpers/payment/formatMoney";
import isEmpty from "helpers/isEmpty";
import useShippingInfo from "hooks/useShippingInfo";
import useOrderSummary from "hooks/useOrderSummary";
import SummaryItem from "components/theme/Header/components/CartSidebar/SummaryItem";
const PaymentButtons = dynamic(
	() => import("components/checkout/PaymentButtons"),
	{
		ssr: false
	}
);
import {
	Wrapper,
	CartItem,
	Thumbnail,
	Content,
	CartFooter,
	EmptyState,
	Attribute
} from "./styles";

const CartSidebar = ({ toggleSidebar }) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { promotion } = useCheckout();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale, formatMessage } = useIntl();

	const shippingInfo = useShippingInfo();
	const { duty, tax, shippingCost, shippingTotal } = shippingInfo;

	const { orderTotal, subTotal, promotion: promotionValue } = useOrderSummary({
		shippingTotal,
		exchangeRate,
		cart: state.data || [],
		promotion
	});

	return (
		<Wrapper>
			{state && state.data && state.data.length > 0 ? (
				<div>
					<div>
						{state.data.map(
							({ product: { name, images, slug }, sku, quantity }) => (
								<CartItem key={sku.id}>
									<Thumbnail>
										<Link
											href="/[lang]/product/[slug]"
											as={`/${locale}/product/${slug}`}
										>
											<a onClick={toggleSidebar}>
												<img
													src={`https://res.cloudinary.com/helloiamelliot/${images.edges[0].node.image}`}
													alt={name}
												/>
											</a>
										</Link>
									</Thumbnail>
									<Content>
										<button
											type="button"
											onClick={() =>
												removeFromCart({ dispatch, skuId: sku.id })
											}
										>
											<CancelIcon width={14} height={14} color="#a5a5a5" />
										</button>
										<Link
											href="/[lang]/product/[slug]"
											as={`/${locale}/product/${slug}`}
										>
											<a onClick={toggleSidebar}>{name}</a>
										</Link>
										<p>Qty: {quantity}</p>
										{loading ? (
											"..."
										) : (
											<NumberFormat
												value={Math.round(
													((sku.salePrice || sku.basePrice) * exchangeRate) /
														100
												)}
												displayType={"text"}
												thousandSeparator={true}
												prefix={currency}
											/>
										)}
										{Object.entries(sku.attributes).length > 0 &&
											Object.entries(sku.attributes).map((value, i) => (
												<Attribute key={i}>
													<span>
														{formatMessage({
															id: `product.attribute.${value[0]}`
														})}{" "}
														:{" "}
													</span>
													{value[0] === "Color" ? (
														<Swatch color={value[1]} />
													) : (
														value[1]
													)}
												</Attribute>
											))}
									</Content>
								</CartItem>
							)
						)}
					</div>
					<CartFooter>
						<SummaryItem
							sum={Math.round(subTotal)}
							display
							label={formatMessage({ id: "shipping.subtotal" })}
						/>
						<SummaryItem
							sum={Math.round(promotionValue)}
							display={!!promotion}
							label={formatMessage({ id: "shipping.promotion" })}
						/>
						{!isEmpty(shippingInfo) && (
							<>
								<SummaryItem
									sum={formatMoney({
										sum: shippingCost,
										exchangeRate
									})}
									display
									label={formatMessage({ id: "shipping.title" })}
								/>
								<SummaryItem
									sum={formatMoney({ sum: tax, exchangeRate })}
									display={tax > 0}
									label={formatMessage({ id: "shipping.tax" })}
								/>
								<SummaryItem
									sum={formatMoney({ sum: duty, exchangeRate })}
									display={duty > 0}
									label={formatMessage({ id: "shipping.duty" })}
								/>
							</>
						)}
						<SummaryItem
							sum={Math.round(orderTotal)}
							display
							label={formatMessage({ id: "cart.th.total" })}
						/>
						<div>
							<Link href="/[lang]/cart" as={`/${locale}/cart`}>
								<Button
									as="a"
									wide
									marginBottom={1}
									variant="secondary"
									onClick={toggleSidebar}
								>
									<FormattedMessage id="button.view_cart" />
								</Button>
							</Link>
							<Link href="/[lang]/checkout" as={`/${locale}/checkout`}>
								<Button
									as="a"
									wide
									variant="primary"
									onClick={toggleSidebar}
									marginBottom={1}
								>
									<FormattedMessage id="button.checkout" />
								</Button>
							</Link>
							<PaymentButtons />
						</div>
					</CartFooter>
				</div>
			) : (
				<EmptyState>
					<EmptyCart />
					<h4>Your cart is empty</h4>
				</EmptyState>
			)}
		</Wrapper>
	);
};

export default CartSidebar;
