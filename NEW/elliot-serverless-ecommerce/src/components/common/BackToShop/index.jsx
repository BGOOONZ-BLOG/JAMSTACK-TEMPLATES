import Link from "next/link";
import { useIntl, FormattedMessage } from "react-intl";
import Button from "components/common/Button";
import { Wrapper } from "./styles";

export default ({ title }) => {
	const { locale } = useIntl();

	return (
		<Wrapper>
			<h2>
				<FormattedMessage id={title} />
			</h2>
			<Link href="/[lang]/" as={`/${locale}/`}>
				<Button as="a" variant="primary">
					<FormattedMessage id="button.back_to_shop" />
				</Button>
			</Link>
		</Wrapper>
	);
};
