import Link from "next/link";
import { FormattedMessage } from "react-intl";
// import Stars from "components/common/Stars";
import Button from "components/common/Button";
import Label from "components/common/Label";
import Prices from "components/common/Prices";
import { useCurrency } from "providers/CurrencyProvider";
import {
	Wrapper,
	Thumbnail,
	Content,
	Header,
	Details,
	Body,
	Footer
} from "./styles";

export default ({
	slug,
	name,
	shortDescription,
	quantity,
	images,
	// gender,
	skus,
	onClick,
	locale
}) => {
	const { state: currency, exchangeRate, loading } = useCurrency();

	return (
		<Wrapper>
			<Thumbnail>
				<Link href="/[lang]/product/[slug]" as={`/${locale}/product/${slug}`}>
					<a>
						{images?.edges?.length > 1 ? (
							images.edges
								.slice(0, 2)
								.map(({ node }) => (
									<img
										key={node.id}
										src={`https://res.cloudinary.com/helloiamelliot/${node.image}`}
										alt={name}
									/>
								))
						) : (
							<>
								<img
									src={`https://res.cloudinary.com/helloiamelliot/${images.edges[0].node.image}`}
									alt={name}
								/>
								<img
									src={`https://res.cloudinary.com/helloiamelliot/${images.edges[0].node.image}`}
									alt={name}
								/>
							</>
						)}
					</a>
				</Link>
				{skus?.edges[0]?.node?.salePrice && (
					<Label>
						<span>Sale</span>
					</Label>
				)}
			</Thumbnail>
			<Content>
				<Header>
					<Details>
						<Link
							href="/[lang]/product/[slug]"
							as={`/${locale}/product/${slug}`}
						>
							<a>
								<h2>{name}</h2>
							</a>
						</Link>
						<Prices
							salePrice={skus?.edges[0]?.node?.salePrice}
							basePrice={skus?.edges[0]?.node?.basePrice}
							loading={loading}
							exchangeRate={exchangeRate}
							currency={currency}
						/>
					</Details>
					{/* <div>
					<Stars stars={stars} />
				</div> */}
				</Header>
				<Body dangerouslySetInnerHTML={{ __html: shortDescription }} />
				<Footer>
					<Button
						onClick={onClick}
						disabled={parseFloat(quantity) <= 0}
						type="button"
						variant="primary"
					>
						<FormattedMessage id="button.add_to_cart" />
					</Button>
				</Footer>
			</Content>
		</Wrapper>
	);
};
