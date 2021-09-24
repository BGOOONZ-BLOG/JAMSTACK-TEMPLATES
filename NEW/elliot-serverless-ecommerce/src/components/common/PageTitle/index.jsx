import Breadcrumbs from "components/common/Breadcrumbs";
import { Title, Wrapper } from "./styles";

const PageTitle = ({ title, breadcrumbs, breadCrumbsAlign = "start" }) => (
	<Wrapper>
		<Title>{title}</Title>
		{breadcrumbs && (
			<Breadcrumbs flexAlign={breadCrumbsAlign} links={breadcrumbs} />
		)}
	</Wrapper>
);

export default PageTitle;
