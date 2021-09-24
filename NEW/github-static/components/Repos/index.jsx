import Repo from "./Repo";
import { Section } from "./styles";

const Repos = ({ repositories }) => (
	<Section>
		<ul>
			{repositories.nodes.map((item, index) => (
				<Repo item={item} key={index} />
			))}
		</ul>
	</Section>
);

export default Repos;
