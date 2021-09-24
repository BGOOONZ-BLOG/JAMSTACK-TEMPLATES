import { useState } from "react";
import { useIntl, FormattedMessage } from "react-intl";
import Container from "components/common/Container";
import PageTitle from "components/common/PageTitle";
import Dropdown from "components/common/Dropdown";
import { GridIcon, ListIcon } from "components/common/Icons";
import ProductCard from "components/common/ProductCard";
import { useDispatchCart, useCart } from "providers/CartProvider";
import { useDispatchSidebar } from "providers/SidebarProvider";
import { addQuantityByProduct, addToCart } from "components/cart/actions";
import {
	FiltersWrapper,
	Header,
	Products,
	Result,
	Filters,
	ShowMore
} from "./styles";

export default ({ products, collection }) => {
	const [grid, setGrid] = useState(true);
	const [visible, setVisible] = useState(8);
	const [sortBy, setSorting] = useState("Newest");
	const { locale, formatMessage } = useIntl();
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

	return (
		<Container>
			<Header>
				<PageTitle
					title={formatMessage({ id: "shop.page.title" })}
					breadcrumbs={
						collection
							? [
									{
										name: formatMessage({ id: "shop.page.title" }),
										link: `/[lang]/`,
										as: `/${locale}`,
										active: false
									},
									{
										name: collection.name,
										link: `/[lang]/collection/[slug]`,
										as: `/${locale}/collection/${collection.slug}`,
										active: true
									}
							  ]
							: [
									{
										name: formatMessage({ id: "shop.page.title" }),
										link: `/[lang]/`,
										as: `/${locale}`,
										active: false
									}
							  ]
					}
				/>

				<FiltersWrapper>
					<Result>
						<span>{(products && products.edges.length) || 0}</span>
						{formatMessage({ id: "products.found" })}
					</Result>
					<Filters>
						<Dropdown
							label={formatMessage({ id: "dropdown.sort_by" })}
							options={[
								formatMessage({ id: "dropdown.sort_by.default" }),
								formatMessage({ id: "dropdown.sort_by.newest" }),
								formatMessage({ id: "dropdown.sort_by.oldest" })
							]}
							sorting
							setSorting={setSorting}
							displayDefaultValue
						/>

						<button
							style={{ background: "none", border: "none" }}
							type="button"
							onClick={() => setGrid(!grid)}
							aria-label="Change the grid layout"
						>
							{grid ? (
								<ListIcon width={20} height={20} />
							) : (
								<GridIcon width={20} height={20} />
							)}
						</button>
					</Filters>
				</FiltersWrapper>
			</Header>
			<Products grid={grid}>
				{products?.edges
					?.slice(0, visible)
					.sort((a, b) => {
						switch (sortBy) {
							case "Oldest":
								return new Date(b.node.createdOn) + new Date(a.node.createdOn);
							case "Newest":
								return new Date(b.node.createdOn) - new Date(a.node.createdOn);
							default:
								return new Date(b.node.createdOn) - new Date(a.node.createdOn);
						}
					})
					.map(({ node }, i) => {
						const item = state?.data?.find(
							({ product }) => product.id === node.id
						);

						return (
							<ProductCard
								key={i}
								onClick={() => handleCart(node, item)}
								grid={grid}
								{...node}
							/>
						);
					})}
			</Products>
			{visible < products?.edges?.length && (
				<ShowMore>
					<button type="button" onClick={() => setVisible(visible + 4)}>
						<FormattedMessage id="products.show_more" />
					</button>
				</ShowMore>
			)}
		</Container>
	);
};
