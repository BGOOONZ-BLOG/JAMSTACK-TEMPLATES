import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import NumberFormat from "react-number-format";
import { useCurrency } from "providers/CurrencyProvider";
import { useCart, useDispatchCart } from "providers/CartProvider";
import Container from "components/common/Container";
import Swatch from "components/common/Swatch";
import QuantityController from "components/common/QuantityController";
import { CancelIcon } from "components/common/Icons";
import BackToShop from "components/common/BackToShop";
import {
	removeFromCart,
	addQuantityByProduct,
	subtractQuantityByProduct
} from "components/cart/actions";
import {
	TableWrapper,
	Table,
	Thead,
	Tbody,
	Product,
	Thumbnail,
	Content,
	Attribute
} from "./styles";

const ShoppingCart = () => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { locale } = useIntl();

	return (
		<Container>
			{state && state.data && state.data.length > 0 ? (
				<TableWrapper>
					<Table>
						<Thead>
							<tr>
								<th>
									<FormattedMessage id="cart.th.product" />
								</th>
								<th>
									<FormattedMessage id="cart.th.price" />
								</th>
								<th>
									<FormattedMessage id="cart.th.quantity" />
								</th>
								<th>
									<FormattedMessage id="cart.th.total" />
								</th>
								<th></th>
							</tr>
						</Thead>
						<Tbody>
							{state.data.map(
								({
									product: { images, name, slug, description },
									quantity,
									sku
								}) => {
									return (
										<tr key={sku.id}>
											<td>
												<Product>
													<Thumbnail>
														<Link
															href="/[lang]/product/[slug]"
															as={`/${locale}/product/${slug}`}
														>
															<a>
																<img
																	src={`https://res.cloudinary.com/helloiamelliot/${images.edges[0].node.image}`}
																	alt={name}
																/>
															</a>
														</Link>
													</Thumbnail>
													<Content>
														<Link
															href="/[lang]/product/[slug]"
															as={`/${locale}/product/${slug}`}
														>
															<a>{name}</a>
														</Link>
														{Object.entries(sku.attributes).length > 0 &&
															Object.entries(sku.attributes).map((value, i) => (
																<Attribute key={i}>
																	<span>{value[0]}</span>
																	{value[0] === "Color" ? (
																		<Swatch color={value[1]} />
																	) : (
																		value[1]
																	)}
																</Attribute>
															))}
														<div
															dangerouslySetInnerHTML={{ __html: description }}
														/>
													</Content>
												</Product>
											</td>
											<td>
												{loading ? (
													"..."
												) : (
													<>
														{sku.salePrice && (
															<NumberFormat
																value={Math.round(
																	(sku.salePrice * exchangeRate) / 100
																)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={currency}
															/>
														)}
														<NumberFormat
															value={Math.round(
																(sku.basePrice * exchangeRate) / 100
															)}
															displayType={"text"}
															thousandSeparator={true}
															prefix={currency}
															style={{
																textDecoration: sku.salePrice && "line-through",
																marginRight: ".5rem"
															}}
														/>
													</>
												)}
											</td>
											<td>
												<QuantityController
													cart
													skuId={sku.id}
													quantity={quantity}
													addQuantityByProduct={addQuantityByProduct}
													subtractQuantityByProduct={subtractQuantityByProduct}
													dispatch={dispatch}
												/>
											</td>
											<td>
												<p>
													<strong>
														{loading ? (
															"..."
														) : (
															<NumberFormat
																value={Math.round(
																	(((sku.salePrice || sku.basePrice) *
																		exchangeRate) /
																		100) *
																		quantity
																)}
																displayType={"text"}
																thousandSeparator={true}
																prefix={currency}
															/>
														)}
													</strong>
												</p>
											</td>
											<td>
												<button
													type="button"
													onClick={() =>
														removeFromCart({ dispatch, skuId: sku.id })
													}
												>
													<CancelIcon width={16} height={16} color="#a5a5a5" />
												</button>
											</td>
										</tr>
									);
								}
							)}
						</Tbody>
					</Table>
				</TableWrapper>
			) : (
				<BackToShop title="cart.empty_state" />
			)}
		</Container>
	);
};

export default ShoppingCart;
