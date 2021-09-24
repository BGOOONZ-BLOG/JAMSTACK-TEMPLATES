import Link from "next/link";
import { useIntl, FormattedMessage } from "react-intl";
import { useCurrency } from "providers/CurrencyProvider";
import languages from "helpers/i18n/languages.json";
import currencies from "helpers/payment/currencies.json";
import Dropdown from "components/common/Dropdown";
import {
	Navigation,
	Menu,
	DesktopMenu,
	Options,
	MenuBottom,
	List
} from "./styles";

const NavigationLinks = ({ toggleSidebar, checkout, legal }) => {
	const { state: currency, setState: setCurrency } = useCurrency();
	const { locale } = useIntl();

	return (
		<Navigation>
			<Options>
				<List>
					<Dropdown
						standalone
						options={languages}
						displayDefaultValue
						languages
					/>
				</List>
				<List>
					<Dropdown
						standalone
						options={currencies}
						currency={currency}
						setCurrency={setCurrency}
						displayDefaultValue
					/>
				</List>
			</Options>
			<Menu>
				<DesktopMenu>
					<li>
						<Link href="/en/" as="/en/">
							<a onClick={toggleSidebar}>
								<FormattedMessage id="shop.page.title" />
							</a>
						</Link>
					</li>
					{legal?.about && (
						<li>
							<Link href="/[lang]/about" as={`/${locale}/about`}>
								<a onClick={toggleSidebar}>
									<FormattedMessage id="footer.about_us" />
								</a>
							</Link>
						</li>
					)}
				</DesktopMenu>
			</Menu>
			{checkout?.domain?.company?.address?.address1 && (
				<MenuBottom>
					<figcaption>
						<FormattedMessage id="sidebar.contact_us" />
					</figcaption>
					<p>
						{checkout?.domain?.company?.address.address1},{" "}
						{checkout?.domain?.company?.address.city},{" "}
						{checkout?.domain?.company?.address.country},{" "}
						{checkout?.domain?.company?.address.zipCode},{" "}
						{checkout?.domain?.company?.address.email},{" "}
						{checkout?.domain?.company?.address.phoneNumber}
					</p>
				</MenuBottom>
			)}
		</Navigation>
	);
};

export default NavigationLinks;
