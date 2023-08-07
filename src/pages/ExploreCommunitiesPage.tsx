import { useEffect, useState } from "react";
import Constants from "../constants";
import { Link } from "react-router-dom";
import { IconSearch } from "@tabler/icons-react";
import { getAllCommunities } from "../api/communities";
import { Community } from "../types";
import SearchResultCommunity from "../components/SearchResultCommunity";

function ExploreCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([]);

  useEffect(() => {
    (async () => {
      const allCommunities = await getAllCommunities();
      setCommunities(allCommunities);
    })();
  }, []);

  return (
    <div>
      <h1>Explore Communities</h1>
      {communities.length > 0 ? (
        <ul className='space-y-2'>
          {communities.map((community) => (
            <li key={community.name} className='hover:bg-gray-100 cursor-pointer'>
              <Link to={`/${Constants.PREFIX_COMMUNITY}${community.name}`}>
                <SearchResultCommunity community={community} />
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

export default ExploreCommunitiesPage;
