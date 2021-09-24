import Link from "next/link";
import { useIntl, FormattedMessage } from "react-intl";
import { Menu, InnerMenu } from "./styles";

const Links = ({ collections }) => {
	const { locale } = useIntl();

	return (
		<Menu>
			<li>
				<Link href="/[lang]/" as={`/${locale}/`}>
					<a>
						<FormattedMessage id="shop.page.title" />
					</a>
				</Link>
			</li>
			{collections && collections.edges && (
				<li>
					<Link
						href="/[lang]/collection/[slug]"
						as={`/${locale}/collection/${
							collections.edges.filter(
								({ node: { products } }) => products?.edges?.length > 0
							)[0].node.slug
						}`}
					>
						<a>
							<FormattedMessage id="header.links.collections" />
						</a>
					</Link>

					<InnerMenu>
						{collections.edges
							.filter(({ node: { products } }) => products?.edges?.length > 0)
							.map(({ node: { id, name, slug } }) => (
								<li key={id}>
									<Link
										href="/[lang]/collection/[slug]"
										as={`/${locale}/collection/${slug}`}
									>
										<a>{name}</a>
									</Link>
								</li>
							))}
					</InnerMenu>
				</li>
			)}
		</Menu>
	);
};

export default Links;
