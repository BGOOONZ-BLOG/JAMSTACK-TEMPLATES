import Link from "next/link";
import { useIntl } from "react-intl";
import { Card, CardHeader, CardFooter } from "./styles";

export default ({ product: { id, price, name } }) => {
	const { locale } = useIntl();

	return (
		<Card>
			<CardHeader>
				<Link href={`/[lang]/product?id=${id}`} as={`/${locale}/product/${id}`}>
					<a>{name}</a>
				</Link>
			</CardHeader>
			<CardFooter>
				<span>${price}</span>
			</CardFooter>
		</Card>
	);
};
