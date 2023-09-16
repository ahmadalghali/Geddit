import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchResultSkeleton from "@/components/skeletons/SearchResultSkeleton";
import { CommunitySummaryDTO, PostSummaryDTO, UserDTO } from "@/types/dtos";
import { SegmentedControl } from "@mantine/core";
import { Searchable } from "@/types/index";
import { searchCommunities, searchPosts, searchUsers } from "@/api/search";
import SearchResultList from "@/components/SearchResultList";
import SearchResultCommunity from "@/components/SearchResultCommunity";
import SearchResultPost from "@/components/SearchResultPost";
import SearchResultUser from "@/components/SearchResultUser";

// TODO: use the enum object approach to render which block

function SearchResultsPage() {
  const [resultTypes] = useState(["Communities", "Posts", "Users"]);
  const [selectedTab, setSelectedTab] = useState<Searchable>("Communities");

  return (
    <>
      <SegmentedControl
        data={resultTypes}
        value={selectedTab}
        onChange={(value: Searchable) => setSelectedTab(value)}
        fullWidth
        size='md'
      />
      <br />
      <ResultsPanel selectedTab={selectedTab} />
    </>
  );
}

function ResultsPanel({ selectedTab }: { selectedTab: Searchable }) {
  // This hook grabs the search query params from your browser
  // Example: geddit.com/search?query=cscareers
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const searchQuery = searchParams.get("query");
  const [searchResultsCommunities, setSearchResultsCommunities] = useState<CommunitySummaryDTO[]>([]);
  const [searchResultsPosts, setSearchResultsPosts] = useState<PostSummaryDTO[]>([]);
  const [searchResultsUsers, setSearchResultsUsers] = useState<UserDTO[]>([]);

  useEffect(() => {
    if (!searchQuery) return;

    const performSearch = async (searchQuery: string) => {
      setIsLoading(true);

      if (selectedTab == "Communities") {
        const results = await searchCommunities(searchQuery);
        setSearchResultsCommunities(results);
      } else if (selectedTab == "Posts") {
        const results = await searchPosts(searchQuery);

        setSearchResultsPosts(results);
      } else if (selectedTab == "Users") {
        const results = await searchUsers(searchQuery);
        setSearchResultsUsers(results);
      }
      setIsLoading(false);
    };

    performSearch(searchQuery);
  }, [searchQuery, selectedTab]);

  if (isLoading) return <SearchResultSkeleton count={10} />;

  return (
    <>
      {selectedTab == "Communities" && (
        <SearchResultList
          searchResults={searchResultsCommunities}
          renderItem={(community) => <SearchResultCommunity community={community} />}
          getKey={(community: CommunitySummaryDTO) => community.name}
        />
      )}
      {selectedTab == "Posts" && (
        <SearchResultList
          searchResults={searchResultsPosts}
          renderItem={(post) => <SearchResultPost post={post} />}
          getKey={(post: PostSummaryDTO) => post.id}
        />
      )}
      {selectedTab == "Users" && (
        <SearchResultList
          searchResults={searchResultsUsers}
          renderItem={(user) => <SearchResultUser user={user} />}
          getKey={(user: UserDTO) => user.id}
        />
      )}
    </>
  );
}

export default SearchResultsPage;
