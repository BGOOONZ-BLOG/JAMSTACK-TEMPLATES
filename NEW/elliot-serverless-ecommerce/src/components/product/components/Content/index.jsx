import { Flex, Item } from "react-flex-ready";
import Carousel from "components/product/components/Carousel";
import Details from "components/product/components/Details";
import { Wrapper } from "./styles";

const Content = props => (
	<Wrapper as={Flex} align="start">
		<Item
			col={6}
			colTablet={12}
			colMobile={12}
			className="item__container item__container--carousel"
		>
			<Carousel title={props.name} images={props.images} />
		</Item>
		<Item
			col={6}
			colTablet={12}
			colMobile={12}
			className="item__container item__container--details"
		>
			<Details {...props} />
		</Item>
	</Wrapper>
);

export default Content;
