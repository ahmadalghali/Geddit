import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { search } from "../api/communities";
import { Community } from "../types";
import SearchResultCommunity from "../components/SearchResultCommunity";
import { IconSearch } from "@tabler/icons-react";
import Constants from "../constants";

function SearchResultsPage() {
  // This hook grabs the search query params from your browser
  // Example: gogeddit.com/search?query=cscareers
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<Community[]>([]);

  useEffect(() => {
    const performSearch = async () => {
      const searchQuery = searchParams.get("query");
      if (searchQuery) {
        const communitiesResponse = await search(searchQuery);

        setSearchResults(communitiesResponse);
      }
    };

    performSearch();
  }, [searchParams]);

  return (
    <div>
      <p className='text-sm'>Results: {searchResults.length}</p>
      {searchResults.length > 0 ? (
        <ul className='list-none p-0 m-0'>
          {searchResults.map((searchResult) => (
            <li key={searchResult.id} className='hover:bg-gray-100 cursor-pointer'>
              <Link to={`/${Constants.PREFIX_COMMUNITY}${searchResult.name}`}>
                <SearchResultCommunity community={searchResult} />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NoSearchResults className='mt-20' />
      )}
    </div>
  );
}

function NoSearchResults({ className }: { className: string }) {
  return (
    <div className={"flex flex-col items-center text-gray-400 " + className}>
      <IconSearch size='60' />
      <p className='text-2xl font-semibold '>No communities</p>
    </div>
  );
}

export default SearchResultsPage;
