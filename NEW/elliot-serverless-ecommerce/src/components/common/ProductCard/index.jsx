import { useIntl } from "react-intl";
import Box from "components/common/ProductCard/Box";
import WideBox from "components/common/ProductCard/WideBox";

export default ({ grid, ...props }) => {
	const { locale } = useIntl();

	return grid ? (
		<Box {...props} locale={locale} />
	) : (
		<WideBox {...props} locale={locale} />
	);
};
