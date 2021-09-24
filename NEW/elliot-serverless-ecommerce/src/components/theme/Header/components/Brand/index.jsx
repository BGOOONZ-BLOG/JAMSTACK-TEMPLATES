import Link from "next/link";
import Logo from "components/common/Logo";
import { useIntl } from "react-intl";
import { Wrapper, Img } from "./styles";

const Brand = ({ seoDetails }) => {
	const { locale } = useIntl();

	return (
		<Link href="/[lang]/" as={`/${locale}/`}>
			<a aria-label="Brand logo">
				<Wrapper>
					{seoDetails?.lookAndFeel?.seo?.logo ? (
						<Img
							src={`https://res.cloudinary.com/helloiamelliot/${seoDetails.lookAndFeel.seo.logo}`}
							alt={seoDetails.lookAndFeel.seo.title}
						/>
					) : (
						<Logo width="100%" height={24} />
					)}
				</Wrapper>
			</a>
		</Link>
	);
};

export default Brand;
