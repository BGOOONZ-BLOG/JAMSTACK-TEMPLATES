import NavigationLinks from "components/theme/Header/components/NavigationLinks";
import CartSidebar from "components/theme/Header/components/CartSidebar";
import SearchSidebar from "components/theme/Header/components/SearchSidebar";
import { Wrapper, Burger, Close, Nav, Overlay, Content } from "./styles";

export default ({
	visibleSidebar,
	toggleSidebar,
	content,
	checkout,
	legal
}) => {
	const renderContent = () => {
		switch (content) {
			case "cart":
				return (
					<CartSidebar
						toggleSidebar={() =>
							toggleSidebar({ type: "CLOSE_SIDEBAR", content: "" })
						}
					/>
				);
			case "search":
				return (
					<SearchSidebar
						toggleSidebar={() =>
							toggleSidebar({ type: "CLOSE_SIDEBAR", content: "" })
						}
					/>
				);
			default:
				return (
					<NavigationLinks
						checkout={checkout}
						legal={legal}
						toggleSidebar={() =>
							toggleSidebar({ type: "CLOSE_SIDEBAR", content: "" })
						}
					/>
				);
		}
	};

	return (
		<>
			<Overlay
				visible={visibleSidebar}
				onClick={() => toggleSidebar({ type: "CLOSE_SIDEBAR", content: "" })}
			/>
			<Wrapper>
				<Nav visible={visibleSidebar}>
					<Burger>
						<Close
							onClick={() =>
								toggleSidebar({ type: "CLOSE_SIDEBAR", content: "" })
							}
						/>
					</Burger>
					<Content>{renderContent()}</Content>
				</Nav>
			</Wrapper>
		</>
	);
};
