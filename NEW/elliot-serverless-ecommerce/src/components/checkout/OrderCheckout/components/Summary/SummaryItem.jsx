import NumberFormat from "react-number-format";
import { Flex, Price } from "./styles";
import { useCurrency } from "providers/CurrencyProvider";

const SummaryItem = ({ label, sum, display }) => {
	const { state: currency, loading } = useCurrency();

	return display ? (
		<Flex border>
			<p>{label}</p>
			<Price>
				{loading ? (
					"..."
				) : (
					<NumberFormat
						value={sum}
						displayType={"text"}
						thousandSeparator={true}
						prefix={currency}
					/>
				)}
			</Price>
		</Flex>
	) : null;
};

export default SummaryItem;
