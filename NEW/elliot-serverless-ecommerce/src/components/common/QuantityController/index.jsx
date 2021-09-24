import { MinusIcon, PlusIcon } from "components/common/Icons";
import { Wrapper, Controller } from "./styles";

export default ({
	wide,
	addQuantityByProduct,
	subtractQuantityByProduct,
	skuId,
	quantity,
	setQuantity,
	cart,
	dispatch
}) => {
	const handleQuantity = ({ type, value }) => {
		if (cart) {
			switch (type) {
				case "add":
					return addQuantityByProduct({
						dispatch,
						skuId
					});
				case "subtract":
					return subtractQuantityByProduct({
						dispatch,
						skuId
					});
				default:
					return null;
			}
		} else {
			switch (type) {
				case "add":
					return setQuantity(quantity + 1);
				case "subtract":
					return setQuantity(quantity - 1);
				default:
					return setQuantity(value);
			}
		}
	};

	return (
		<Wrapper wide={wide}>
			<Controller
				disabled={quantity <= 1}
				onClick={() =>
					handleQuantity({
						type: "subtract"
					})
				}
			>
				<MinusIcon
					color={quantity <= 1 ? "#585858" : "#000"}
					width={16}
					height={16}
				/>
			</Controller>
			<input
				type="text"
				value={quantity}
				readOnly={cart}
				onChange={e =>
					handleQuantity({
						type: "value",
						value: e.target.value
					})
				}
			/>
			<Controller
				onClick={() =>
					handleQuantity({
						type: "add"
					})
				}
			>
				<PlusIcon width={16} height={16} />
			</Controller>
		</Wrapper>
	);
};
