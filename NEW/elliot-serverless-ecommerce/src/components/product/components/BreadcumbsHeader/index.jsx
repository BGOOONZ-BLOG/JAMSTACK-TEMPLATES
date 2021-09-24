import { Wrapper } from "./styles";
import Breadcrumbs from "components/common/Breadcrumbs";
import { useIntl } from "react-intl";

const BreadcumbsHeader = ({ slug, title }) => {
	const { locale, formatMessage } = useIntl();

	return (
		<Wrapper>
			<Breadcrumbs
				flexAlign="start"
				links={[
					{
						name: formatMessage({ id: "shop.page.title" }),
						link: `/[lang]/`,
						as: `/${locale}/`
					},
					{
						name: title,
						link: `/[lang]/product/[slug]`,
						as: `/${locale}/product/${slug}`,
						active: true
					}
				]}
			/>
		</Wrapper>
	);
};

export default BreadcumbsHeader;
