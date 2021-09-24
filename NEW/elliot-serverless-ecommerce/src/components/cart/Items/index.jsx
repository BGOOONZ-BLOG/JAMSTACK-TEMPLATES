import PageTitle from "components/common/PageTitle";
import { useIntl } from "react-intl";
import ShoppingCart from "components/cart/components/ShoppingCart";
import Checkout from "components/cart/components/Checkout";
import { useCart } from "providers/CartProvider";

const Items = () => {
	const { locale, formatMessage } = useIntl();
	const { state } = useCart();

	const breadcrumbs = [
		{
			name: formatMessage({ id: "shop.page.title" }),
			link: `/[lang]/`,
			as: `/${locale}/`
		},
		{
			name: formatMessage({ id: "cart.page.title" }),
			link: `/[lang]/cart/`,
			as: `/${locale}/cart/`,
			active: true
		}
	];

	return (
		<>
			<PageTitle
				title={formatMessage({ id: "title.cart" })}
				breadcrumbs={breadcrumbs}
				breadCrumbsAlign="center"
			/>
			<ShoppingCart />
			{state?.data?.length > 0 && <Checkout />}
		</>
	);
};

export default Items;
