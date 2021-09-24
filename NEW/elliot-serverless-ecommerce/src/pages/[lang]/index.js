import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import getProducts from "helpers/buildtime/getProducts";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";
import locales from "helpers/i18n/locales";

const Index = ({ legal, products, collections, seoDetails, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
	>
		{products?.edges?.length > 0 ? (
			<>
				<SEO
					localizedTitle="shop.page.title"
					localizedDescription="shop.page.description"
					seoDetails={seoDetails}
				/>
				<Products products={products} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const getStaticPaths = () => {
	return {
		paths: locales.map(locale => ({ params: { lang: locale } })),
		fallback: true
	};
};

export const getStaticProps = async ({ params: { lang } }) => {
	const [
		products,
		collections,
		seoDetails,
		checkout,
		legal
	] = await Promise.all([
		getProducts(),
		getCollections(),
		getSeoDetails(),
		getCheckout(),
		getLegal()
	]);

	return {
		unstable_revalidate: 1,
		props: {
			products,
			collections,
			seoDetails,
			locale: lang,
			checkout,
			legal
		}
	};
};

export default withLocale(Index);
