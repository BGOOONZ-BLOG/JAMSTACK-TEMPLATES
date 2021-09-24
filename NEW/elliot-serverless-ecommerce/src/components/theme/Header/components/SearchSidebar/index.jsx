import { useState } from "react";
import algoliasearch from "algoliasearch/lite";
import { InstantSearch, SearchBox, Configure } from "react-instantsearch-dom";
import Results from "./components/Results";
import { ELLIOT_DOMAIN_ID, ELLIOT_STORE_FRONT_NAME, ENVIRONMENT } from "config";
import { Wrapper } from "./styles";

const searchClient = algoliasearch(
	"X3RWDDAVPO",
	"77e26190e9f0321831275a94abe685ba"
);

const Search = () => {
	const [search, toggleSearch] = useState(false);

	const handleSearchChange = e => {
		if (e.target.value === "") {
			return toggleSearch(false);
		}
		toggleSearch(true);
	};

	return (
		<Wrapper>
			<InstantSearch
				searchClient={searchClient}
				indexName={`elliot_product_index_${ENVIRONMENT || "production"}`}
			>
				<Configure
					hitsPerPage={20}
					filters={`'domain_id':${ELLIOT_DOMAIN_ID} AND 'filter_param':'PUBLISHED' AND 'productCheckouts.slug':${ELLIOT_STORE_FRONT_NAME}`}
				/>
				<SearchBox
					autoFocus={false}
					onClick={e => handleSearchChange(e)}
					onChange={e => handleSearchChange(e)}
					onReset={() => toggleSearch(false)}
				/>
				{search && <Results />}
			</InstantSearch>
		</Wrapper>
	);
};

export default Search;
