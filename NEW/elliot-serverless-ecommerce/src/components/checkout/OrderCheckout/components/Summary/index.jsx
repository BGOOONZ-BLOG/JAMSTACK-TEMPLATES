import Link from "next/link";
import { useIntl, FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart } from "providers/CartProvider";
import { Wrapper, Flex, Product, Item, Price, Card } from "./styles";
import useShippingInfo from "hooks/useShippingInfo";
import isEmpty from "helpers/isEmpty";
import formatMoney from "helpers/payment/formatMoney";
import SummaryItem from "./SummaryItem";
import { useCheckout } from "providers/CheckoutProvider";
import usePromotionLabel from "hooks/usePromotionLabel";
import useOrderSummary from "hooks/useOrderSummary";

export default () => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { locale, formatMessage } = useIntl();
	const shippingInfo = useShippingInfo();
	const { promotion } = useCheckout();
	const cart = state.data || [];
	const { duty, tax, shippingCost, shippingTotal } = shippingInfo;
	const { orderTotal, subTotal, promotion: promotionSum } = useOrderSummary({
		shippingTotal,
		exchangeRate,
		cart,
		promotion
	});

	return (
		<Wrapper>
			<h2>
				<FormattedMessage id="summary.title" />
			</h2>
			<Card>
				<Flex border>
					<p>
						<FormattedMessage id="cart.th.product" />
					</p>
					<p>
						<FormattedMessage id="cart.th.total" />
					</p>
				</Flex>
				{state?.data?.length > 0 &&
					state.data.map(({ product: { id, slug, name }, quantity, sku }) => (
						<Product key={id}>
							<Link
								href="/[lang]/product/[slug]"
								as={`/${locale}/product/${slug}`}
								key={sku.id}
							>
								<a>
									<p>{name}</p>
									<span>x{quantity}</span>
								</a>
							</Link>
							<Price>
								{loading ? (
									"..."
								) : (
									<NumberFormat
										value={Math.round(
											(((sku.salePrice || sku.basePrice) * exchangeRate) /
												100) *
												quantity
										)}
										displayType={"text"}
										thousandSeparator={true}
										prefix={currency}
									/>
								)}
							</Price>
						</Product>
					))}
				<SummaryItem
					display
					label={formatMessage({ id: "shipping.subtotal" })}
					sum={Math.round(subTotal)}
				/>
				<SummaryItem
					display={!!promotion}
					label={usePromotionLabel()}
					sum={Math.round(promotionSum)}
				/>
				<Item>
					<h3>
						<FormattedMessage id="summary.shipping_taxes" />
					</h3>
					{isEmpty(shippingInfo) && (
						<FormattedMessage id="summary.input_address" />
					)}
				</Item>
				{!isEmpty(shippingInfo) && (
					<>
						<SummaryItem
							display
							label={formatMessage({ id: "shipping.title" })}
							sum={formatMoney({ sum: shippingCost, exchangeRate })}
						/>
						<SummaryItem
							display={parseFloat(tax) > 0}
							label={formatMessage({ id: "shipping.tax" })}
							sum={formatMoney({ sum: tax, exchangeRate })}
						/>
						<SummaryItem
							display={parseFloat(duty) > 0}
							label={formatMessage({ id: "shipping.duty" })}
							sum={formatMoney({ sum: duty, exchangeRate })}
						/>
					</>
				)}
				<Flex>
					<h5>
						<FormattedMessage id="shipping.total" />
					</h5>
					{state?.data?.length > 0 && (
						<Price>
							{loading ? (
								"..."
							) : (
								<NumberFormat
									value={Math.round(orderTotal)}
									displayType={"text"}
									thousandSeparator={true}
									prefix={currency}
								/>
							)}
						</Price>
					)}
				</Flex>
			</Card>
		</Wrapper>
	);
};
