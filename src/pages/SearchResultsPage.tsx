import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { search } from "@/api/communities";
import { IconSearch } from "@tabler/icons-react";
import PageTitle from "@/components/PageTitle";
import SearchResultSkeleton from "@/components/skeletons/SearchResultSkeleton";
import { CommunitySummaryDTO } from "@/types/dtos";
import SearchResultCommunityList from "@/components/SearchResultCommunityList";

function SearchResultsPage() {
  // This hook grabs the search query params from your browser
  // Example: gogeddit.com/search?query=cscareers
  const [searchParams] = useSearchParams();
  const [searchResults, setSearchResults] = useState<CommunitySummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      const searchQuery = searchParams.get("query");
      if (searchQuery) {
        const communitiesResponse = await search(searchQuery);
        setSearchResults(communitiesResponse);
        setIsLoading(false);
      }
    };

    performSearch();
  }, [searchParams]);

  if (isLoading) return <SearchResultSkeleton count={10} />;

  return (
    <>
      <p className='text-xl font-medium'>Results: {searchResults.length}</p>
      {searchResults.length > 0 ? (
        <SearchResultCommunityList searchResults={searchResults} />
      ) : (
        <NoSearchResults className='mt-20' />
      )}
    </>
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
