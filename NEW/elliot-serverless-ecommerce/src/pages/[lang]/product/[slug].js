import Error from "next/error";
import Layout from "components/common/Layout";
import SEO from "components/common/SEO";
import ProductItem from "components/product/ProductItem";
import withLocale from "hoc/withLocale";
import locales from "helpers/i18n/locales";
import getProductsSlugs from "helpers/buildtime/getProductsSlugs";
import getCollections from "helpers/buildtime/getCollections";
import getSeoDetails from "helpers/buildtime/getSeoDetails";
import getCheckout from "helpers/buildtime/getCheckout";
import getLegal from "helpers/buildtime/getLegal";
import getProductBySlug from "helpers/buildtime/getProductBySlug";

const Product = ({ legal, product, collections, seoDetails, checkout }) => (
	<Layout
		collections={collections}
		seoDetails={seoDetails}
		checkout={checkout}
		legal={legal}
	>
		{product.id ? (
			<>
				<SEO
					title={product.productSeo?.edges[0]?.node?.title || product.name}
					description={
						product.productSeo?.edges[0]?.node?.description ||
						product.description?.replace(/(<([^>]+)>)/gi, "")
					}
					location={product.slug}
					cover={`https://res.cloudinary.com/helloiamelliot/${product.images?.edges[0]?.node?.image}`}
					seoDetails={seoDetails}
				/>
				<ProductItem {...product} globalCollections={collections} />
			</>
		) : (
			<Error statusCode={404} />
		)}
	</Layout>
);

export const getStaticPaths = async () => {
	const productsSlugs = await getProductsSlugs();

	const localizedProducts = productsSlugs.edges.map(({ node: { slug } }) =>
		locales.map(locale => `/${locale}/product/${slug}`)
	);

	return {
		paths: localizedProducts.flatMap(item => item),
		fallback: true
	};
};

export const getStaticProps = async ({ params: { slug, lang } }) => {
	const [
		collections,
		product,
		seoDetails,
		checkout,
		legal
	] = await Promise.all([
		getCollections(),
		getProductBySlug(slug),
		getSeoDetails(),
		getCheckout(),
		getLegal()
	]);

	return {
		unstable_revalidate: 1,
		props: {
			product,
			locale: lang,
			collections,
			seoDetails,
			checkout,
			legal
		}
	};
};

export default withLocale(Product);
