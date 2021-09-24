import Layout from "components/common/Layout";
import OrderCheckout from "components/checkout/OrderCheckout";
import SEO from "components/common/SEO";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/buildtime/getCollections";
import getCheckout from "helpers/buildtime/getCheckout";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getPromotion from "helpers/buildtime/getPromotion";
import getLegal from "helpers/buildtime/getLegal";

const Checkout = ({ legal, collections, checkout, seoDetails, promotion }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
	>
		<SEO
			localizedTitle="shop.page.checkout_title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<OrderCheckout checkout={checkout} promotion={promotion} />
	</Layout>
);

export const getStaticProps = async ({ params: { lang } }) => {
	const collections = await getCollections();
	const seoDetails = await getSeoDetails();
	const checkout = await getCheckout();
	const promotion = await getPromotion();
	const legal = await getLegal();

	return {
		props: {
			collections: collections,
			seoDetails,
			locale: lang,
			checkout,
			promotion,
			legal
		}
	};
};

export { getStaticPaths } from "./index";

export default withLocale(Checkout);
