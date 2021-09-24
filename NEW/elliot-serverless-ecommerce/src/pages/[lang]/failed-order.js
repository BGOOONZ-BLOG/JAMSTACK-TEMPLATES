import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import FailedOrder from "components/shipping/FailedOrder";
import withLocale from "hoc/withLocale";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";
import getPromotion from "helpers/buildtime/getPromotion";

const OrderFailed = ({ legal, collections, seoDetails, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
	>
		<SEO
			localizedTitle="shop.page.title"
			localizedDescription="shop.page.description"
			seoDetails={seoDetails}
		/>
		<FailedOrder />
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

export default withLocale(OrderFailed);
