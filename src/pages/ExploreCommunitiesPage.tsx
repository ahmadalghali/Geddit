import { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import { getAllCommunities } from "@/api/communities";
import SearchResultSkeleton from "@/components/skeletons/SearchResultSkeleton";
import PageTitle from "@/components/PageTitle";
import SearchResultCommunityList from "@/features/search/components/SearchResultCommunityList";
import { CommunitySummaryDTO } from "@/types/dtos";

function ExploreCommunitiesPage() {
  const [communities, setCommunities] = useState<CommunitySummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const allCommunities = await getAllCommunities();
      setCommunities(allCommunities);
      setIsLoading(false);
    })();
  }, []);

  if (isLoading)
    return (
      <>
        <PageTitle>Explore Communities</PageTitle>
        <SearchResultSkeleton count={10} />;
      </>
    );

  return (
    <>
      <PageTitle>Explore Communities</PageTitle>
      {communities.length > 0 ? (
        <SearchResultCommunityList searchResults={communities} />
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

export default ExploreCommunitiesPage;
