import NumberFormat from "react-number-format";
import { useSidebar, useDispatchSidebar } from "providers/SidebarProvider";
import { useCurrency } from "providers/CurrencyProvider";
import { useCheckout } from "providers/CheckoutProvider";
import FreeShippingThresholdTarget from "helpers/constants/FreeShippingThresholdTarget";
import Brand from "./components/Brand";
import Links from "./components/Links";
import Buttons from "./components/Buttons";
import Sidebar from "components/theme/Header/components/Sidebar";
import { Container, Banner, Wrapper, Options } from "./styles";

export default ({ collections, seoDetails, checkout, legal }) => {
	const { state } = useSidebar();
	const { dispatch } = useDispatchSidebar();
	const { state: currency, exchangeRate, loading } = useCurrency();

	const toggleSidebar = ({ type, content }) => {
		dispatch({
			type,
			content
		});
	};

	const { domain, shipFromLocation } = useCheckout();

	const FreeShippingText = () => {
		const threshold = loading ? (
			"..."
		) : (
			<NumberFormat
				value={(parseInt(domain?.freeShippingThreshold) / 100) * exchangeRate}
				displayType={"text"}
				thousandSeparator={true}
				prefix={currency}
			/>
		);

		if (
			domain?.freeShippingThresholdTarget ===
			FreeShippingThresholdTarget.DOMESTIC
		) {
			return (
				<span>
					Free Shipping for all {shipFromLocation?.country} orders over{" "}
					{threshold}
				</span>
			);
		}
		return <span>Free Shipping for all orders over {threshold}</span>;
	};

	return (
		<>
			<Sidebar
				visibleSidebar={state.open}
				toggleSidebar={toggleSidebar}
				content={state.content}
				checkout={checkout}
				legal={legal}
			/>
			<Container>
				{domain?.freeShippingThreshold && (
					<Banner>
						<FreeShippingText />
					</Banner>
				)}
				<Wrapper>
					<Brand seoDetails={seoDetails} />
					<Links collections={collections} />
					<Options>
						<Buttons toggleSidebar={toggleSidebar} />
					</Options>
				</Wrapper>
			</Container>
		</>
	);
};
