import { FormattedMessage } from "react-intl";
import { connectHits } from "react-instantsearch-dom";
import Hit from "components/theme/Header/components/SearchSidebar/components/Hit";
import { Error } from "./styles";

const Results = connectHits(({ hits }) =>
	hits.length > 0 ? (
		hits.map(hit => <Hit key={hit.objectID} hit={hit} />)
	) : (
		<Error>
			<FormattedMessage id="search.no_results" />
		</Error>
	)
);

export default Results;
