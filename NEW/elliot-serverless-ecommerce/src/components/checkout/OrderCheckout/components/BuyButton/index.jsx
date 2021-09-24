import NumberFormat from "react-number-format";
import { useIntl } from "react-intl";
import Button from "components/common/Button";
import Loader from "components/common/Loader";

export default ({
	canSubmit,
	price,
	currency,
	loadingCurrency,
	paymentLoading,
	paymentState
}) => {
	const { formatMessage } = useIntl();

	return (
		<Button
			variant="primary"
			type="submit"
			disabled={!canSubmit}
			wide
			marginBottom={1}
			state={paymentState}
		>
			{loadingCurrency || paymentLoading ? (
				<Loader />
			) : (
				<>
					{!paymentState ? (
						<>
							{formatMessage({ id: "checkout.pay" })}{" "}
							<NumberFormat
								value={Math.round(price)}
								displayType={"text"}
								thousandSeparator={true}
								prefix={currency}
							/>
						</>
					) : (
						paymentState
					)}
				</>
			)}
		</Button>
	);
};
