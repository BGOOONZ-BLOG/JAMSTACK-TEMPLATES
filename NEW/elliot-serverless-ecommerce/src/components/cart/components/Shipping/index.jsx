import Link from "next/link";
import { FormattedMessage } from "react-intl";
import Button from "components/common/Button";
import { Wrapper } from "./styles";

export default ({ locale }) => (
	<Wrapper>
		<div>
			<Link href={`/[lang]/checkout`} as={`/${locale}/checkout`}>
				<Button variant="ghost" wide as="a">
					<FormattedMessage id="button.proceed_to_checkout" />
				</Button>
			</Link>
		</div>
	</Wrapper>
);
