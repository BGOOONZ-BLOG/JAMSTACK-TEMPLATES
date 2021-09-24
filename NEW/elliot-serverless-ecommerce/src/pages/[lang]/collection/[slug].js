import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import Products from "components/listing/Products";
import withLocale from "hoc/withLocale";
import locales from "helpers/i18n/locales";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";

const Product = ({ collection, collections, seoDetails, checkout }) => (
	<Layout collections={collections} seoDetails={seoDetails} checkout={checkout}>
		{collection.products ? (
			<>
				<SEO
					title={collection.name}
					location={collection.slug}
					seoDetails={seoDetails}
				/>
				<Products products={collection.products} collection={collection} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const getStaticPaths = async () => {
	const collections = await getCollections();

	const localizedCollections = collections.edges.map(({ node: { slug } }) =>
		locales.map(locale => `/${locale}/collection/${slug}`)
	);

	return {
		paths: localizedCollections.flatMap(item => item),
		fallback: true
	};
};

export const getStaticProps = async ({ params: { slug, lang } }) => {
	const [collections, seoDetails, checkout, legal] = await Promise.all([
		getCollections(),
		getSeoDetails(),
		getCheckout(),
		getLegal()
	]);

	const collection = collections.edges.find(
		({ node: { slug: _slug } }) => _slug === slug
	);
	return {
		unstable_revalidate: 1,
		props: {
			collection: collection.node,
			locale: lang,
			collections,
			seoDetails,
			checkout,
			legal
		}
	};
};

export default withLocale(Product);
