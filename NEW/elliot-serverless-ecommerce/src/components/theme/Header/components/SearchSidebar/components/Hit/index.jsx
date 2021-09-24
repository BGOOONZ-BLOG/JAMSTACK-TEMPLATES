import Link from "next/link";
import { useIntl } from "react-intl";
import { useCurrency } from "providers/CurrencyProvider";
import Prices from "components/common/Prices";
import { CartItem, Thumbnail, Content } from "./styles";

export default ({
	hit: { name, slug, product_image_url, productSkus, product_gender }
}) => {
	const { state: currency, exchangeRate, loading } = useCurrency();
	const { locale } = useIntl();

	return (
		<CartItem>
			<Thumbnail>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>
						<img src={product_image_url} alt={name} />
					</a>
				</Link>
			</Thumbnail>
			<Content>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>{name}</a>
				</Link>
				<p>{product_gender}</p>
				<Prices
					salePrice={productSkus[0].sale_price}
					basePrice={productSkus[0].base_price}
					loading={loading}
					exchangeRate={exchangeRate}
					currency={currency}
				/>
			</Content>
		</CartItem>
	);
};
