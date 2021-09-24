import { FormattedMessage, useIntl } from "react-intl";
import { useDispatchCart, useCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { addQuantityByProduct, addToCart } from "components/cart/actions";
import BreadcumbsHeader from "components/product/components/BreadcumbsHeader";
import Container from "components/common/Container";
import Content from "components/product/components/Content";
import ProductCard from "components/common/ProductCard";
import Tabs from "components/common/Tabs";
import {
	TabAdditionInformation,
	TabDescription
} from "components/product/components/Tab";
import { Products, Section, SectionTitle } from "./styles";

export default ({
	globalCollections,
	collections,
	description,
	shortDescription,
	id,
	slug,
	name,
	quantity,
	skus,
	tags,
	images,
	attributes,
	metadata,
	gender,
	relatedProducts
}) => {
	const { formatMessage } = useIntl();
	const { state } = useCart();
	const { dispatch } = useDispatchCart();
	const { dispatch: dispatchSidebar } = useDispatchSidebar();

	const handleCart = async (node, item) => {
		if (item?.quantity >= 1) {
			addQuantityByProduct({
				dispatch,
				skuId: item.sku.id
			});
			dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
		} else {
			addToCart({
				dispatch,
				payload: {
					product: node,
					quantity: 1,
					sku: node.skus?.edges[0]?.node
				}
			});
			dispatchSidebar({ type: "OPEN_SIDEBAR", content: "cart" });
		}
	};

	const ids = [];

	return (
		<>
			<Container>
				<BreadcumbsHeader slug={slug} title={name} />
				<Content
					id={id}
					name={name}
					quantity={quantity}
					skus={skus}
					images={images}
					description={shortDescription}
					collections={collections}
					gender={gender}
					tags={tags}
					slug={slug}
					attributes={attributes}
					metadata={metadata}
				/>
			</Container>
			<Container>
				<Tabs
					content={[
						{
							title: formatMessage({ id: "product.description" }),
							content: <TabDescription description={description} />
						},
						{
							title: formatMessage({ id: "product.additional_information" }),
							content: <TabAdditionInformation skus={skus} />
						}
					]}
				/>
			</Container>
			{globalCollections?.edges.filter(collection =>
				collections.edges.find(item => item.node.id === collection.node.id)
			).length > 0 && (
				<Section as={Container}>
					<SectionTitle>
						<FormattedMessage id="product.related_products" />
					</SectionTitle>
					{relatedProducts?.edges?.length > 0 && (
						<Products
							grid={true}
							products={
								relatedProducts?.edges?.filter(({ node }) => node.slug !== slug)
									.length
							}
							related
						>
							{relatedProducts?.edges
								.filter(({ node }) => node.slug !== slug)
								.sort(() => Math.random() - 0.5)
								.slice(0, 4)
								.map(({ node }, i) => {
									const item = state?.data?.find(
										({ product }) => product.id === node.id
									);

									if (ids.includes(node.id)) return null;

									ids.push(node.id);

									return (
										<ProductCard
											key={i}
											onClick={() => handleCart(node, item)}
											grid
											{...node}
										/>
									);
								})}
						</Products>
					)}
				</Section>
			)}
		</>
	);
};
