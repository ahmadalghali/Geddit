import { useState } from "react";
import { useEffect } from "react";
import { getCommunityByName, joinCommunity, leaveCommunity } from "@/api/communities";
import { CommunitySummaryDTO, PostSummaryDTO } from "@/types/dtos";
import { getCommunityPosts } from "@/api/community-posts";

function useCommunity(communityName: string) {
  const [community, setCommunity] = useState<CommunitySummaryDTO | null>(null);
  const [posts, setPosts] = useState<PostSummaryDTO[]>([]);
  // const { communityName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCommunity = async () => {
      return await getCommunityByName(communityName);
    };

    const fetchCommunityPosts = async () => {
      return await getCommunityPosts(communityName);
    };

    Promise.all([fetchCommunity(), fetchCommunityPosts()]).then(([community, posts]) => {
      setCommunity(community);
      setPosts(posts);
      setIsLoading(false);
    });
  }, [communityName]);

  const handleJoinCommunity = async () => {
    if (!community) return;
    const updatedMemberCount = await joinCommunity(community.name);

    setCommunity((prevVal) => {
      if (!prevVal) return null;

      return {
        ...prevVal,
        memberCount: updatedMemberCount,
      };
    });
  };

  const handleLeaveCommunity = async () => {
    if (!community) return;

    const updatedMemberCount = await leaveCommunity(community.name);

    setCommunity((prevVal) => {
      if (!prevVal) return null;

      return {
        ...prevVal,
        memberCount: updatedMemberCount,
      };
    });
  };

  return {
    community,
    posts,
    isLoading,
    handleJoinCommunity,
    handleLeaveCommunity,
  };
}

export default useCommunity;
