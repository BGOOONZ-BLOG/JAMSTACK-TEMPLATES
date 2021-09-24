import { Wrapper, Actions, Cart, CartItems } from "./styles";
import { CartIcon, MenuIcon, SearchIcon } from "components/common/Icons";
import { useCart } from "providers/CartProvider";

const Buttons = ({ toggleSidebar }) => {
	const { state } = useCart();

	return (
		<Wrapper>
			<Actions>
				<button
					aria-label="search"
					type="button"
					onClick={() =>
						toggleSidebar({ type: "OPEN_SIDEBAR", content: "search" })
					}
				>
					<SearchIcon width={20} height={20} />
				</button>
				<button
					type="button"
					aria-label="cart"
					onClick={() =>
						toggleSidebar({ type: "OPEN_SIDEBAR", content: "cart" })
					}
				>
					<Cart>
						<CartIcon width={20} height={20} />
						{state?.data?.length > 0 && (
							<CartItems>{state.data.length}</CartItems>
						)}
					</Cart>
				</button>
				<button
					aria-label="menu"
					type="button"
					onClick={() => toggleSidebar({ type: "OPEN_SIDEBAR", content: "" })}
				>
					<MenuIcon width={20} height={20} />
				</button>
			</Actions>
		</Wrapper>
	);
};

export default Buttons;
