import { useState, Fragment } from "react";
import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import Select from "react-select";
import { BASE_URL } from "config";
import { useCart, useDispatchCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { addToCart, addCustomQuantityByProduct } from "components/cart/actions";
import Button from "components/common/Button";
import QuantityController from "components/common/QuantityController";
import Prices from "components/common/Prices";
import {
	FacebookIcon,
	PinterestIcon,
	TwiterIcon
} from "components/common/Icons/SocialIcon";
import isEmpty from "helpers/isEmpty";
import dynamic from "next/dynamic";
import ToggleHidden from "components/common/ToggleHidden";
import {
	ButtonGroup,
	Shop,
	Sku,
	SocialShares,
	Specs,
	Wrapper,
	LabelField,
	OutOfStock
} from "./styles";
const PaymentButtons = dynamic(
	() => import("components/checkout/PaymentButtons"),
	{
		ssr: false
	}
);

const Details = ({
	id,
	name,
	skus,
	description,
	collections,
	images,
	metadata,
	slug,
	attributes,
	quantity: inventoryQuantity
}) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { state } = useCart();
	const cart = state?.data || [];
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();
	const { locale, formatMessage } = useIntl();
	const [quantity, setQuantity] = useState(1);
	const [selectedVariant, setSelectedVariant] = useState(
		skus?.edges[0]?.node || null
	);

	const itemProduct = state?.data?.find(
		item => item.product.id === id && item.sku.id === selectedVariant.id
	);

	const handleVariant = (attributeKey, value) => {
		skus.edges.map(({ node }) => {
			Object.keys(node.attributes).map(item => {
				if (item === attributeKey && node.attributes[item] === value) {
					setSelectedVariant(node);
				}
			});
		});
	};

	const addToCartPayload = {
		dispatch,
		payload: {
			product: {
				id,
				name,
				description,
				images,
				slug,
				attributes,
				metadata
			},
			quantity,
			sku: selectedVariant
		}
	};

	const handleCart = async () => {
		if (itemProduct?.quantity >= 1) {
			addCustomQuantityByProduct({
				dispatch,
				id,
				skuId: selectedVariant.id,
				quantity
			});
			dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
		} else {
			addToCart(addToCartPayload);
			dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
		}
	};

	return (
		<Wrapper>
			<div>
				<h2>{name}</h2>
				{parseFloat(inventoryQuantity) <= 0 && (
					<OutOfStock>
						<FormattedMessage id="product.out_of_stock" />
					</OutOfStock>
				)}
				{selectedVariant?.orderSkus?.edges[0]?.node.sku?.sku && (
					<Sku>SKU: {selectedVariant?.orderSkus?.edges[0]?.node.sku?.sku}</Sku>
				)}
				<Prices
					salePrice={selectedVariant?.salePrice}
					basePrice={selectedVariant?.basePrice}
					loading={loading}
					exchangeRate={exchangeRate}
					currency={currency}
				/>
			</div>
			<div dangerouslySetInnerHTML={{ __html: description }} />
			{attributes &&
				attributes.map(({ attributeKey, attributeValues }, i) => {
					const options = attributeValues.map((_item, i) => {
						return { value: attributeValues[i], label: attributeValues[i] };
					});
					return (
						<Fragment key={i}>
							<LabelField>
								<FormattedMessage id={`product.attribute.${attributeKey}`} />
							</LabelField>
							<Select
								styles={{
									container: provided => {
										const height = "50px";
										return { ...provided, height };
									},
									control: provided => {
										const height = "50px";
										const border = "2px solid #eaeaea";
										return { ...provided, height, border };
									}
								}}
								theme={theme => ({
									...theme,
									borderRadius: 0,
									colors: {
										...theme.colors,
										primary: "#000",
										primary25: "#eaeaea"
									}
								})}
								onChange={e => handleVariant(attributeKey, e.value)}
								options={options}
								defaultValue={{
									label:
										selectedVariant.attributes[
											Object.keys(selectedVariant.attributes)[0]
										],
									value:
										selectedVariant.attributes[
											Object.keys(selectedVariant.attributes)[0]
										]
								}}
							/>
						</Fragment>
					);
				})}
			<Shop>
				<QuantityController
					wide
					id={id}
					setQuantity={setQuantity}
					quantity={quantity}
				/>
				<ButtonGroup gridArea="b">
					<Button
						disabled={parseFloat(inventoryQuantity) <= 0}
						onClick={handleCart}
						type="button"
						variant="primary"
						wide
					>
						<FormattedMessage id="button.add_to_cart" />
					</Button>
				</ButtonGroup>
				{parseFloat(inventoryQuantity) > 0 && (
					<ToggleHidden gridArea="c" hidden={!isEmpty(cart)}>
						<PaymentButtons addToCartPayload={addToCartPayload} />
					</ToggleHidden>
				)}
			</Shop>
			<Specs>
				{collections && (
					<p>
						<strong>
							<FormattedMessage id="product.category" />:
						</strong>
						{collections.edges.map(({ node }) => (
							<Link
								key={node.id}
								href={`/[lang]/collection/[slug]`}
								as={`/${locale}/collection/${node.slug}`}
							>
								<a>{node.name}</a>
							</Link>
						))}
					</p>
				)}
			</Specs>
			<SocialShares>
				<a
					href={`https://www.facebook.com/sharer/sharer.php?u=${BASE_URL}/${locale}/product/${slug}`}
					aria-label="share to Facebook"
				>
					<FacebookIcon />
				</a>
				<a
					href={`https://twitter.com/home?status=${BASE_URL}/${locale}/product/${slug}`}
					aria-label="share to Twitter"
				>
					<TwiterIcon />
				</a>
				<a
					href={`https://pinterest.com/pin/create/button/?url=${BASE_URL}/${locale}/product/${slug}`}
					aria-label="share to Pinterest"
				>
					<PinterestIcon />
				</a>
			</SocialShares>
		</Wrapper>
	);
};

export default Details;
