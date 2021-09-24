import { Label } from "./styles";

export default ({ isHot }) => (
	<Label isHot>
		<span>{isHot ? "Hot" : "Sale"}</span>
	</Label>
);
