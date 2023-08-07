import { useEffect, useState } from "react";
import { getCommunityByName } from "../api/communities";
import { Community } from "../types";
import { useParams } from "react-router-dom";

function CommunityPage() {
  const [community, setCommunity] = useState<Community | null>(null);
  const { communityName } = useParams();

  useEffect(() => {
    if (communityName) {
      const fetchCommunity = async () => {
        const community = await getCommunityByName(communityName);
        setCommunity(community);
      };
      fetchCommunity();
    }
  }, [communityName]);

  if (!community) {
    return <div>Community doesn't exist sir!</div>;
  }

  return (
    <div>
      <h2>{community.name}</h2>
      <p>{community.description}</p>
    </div>
  );
}

export default CommunityPage;
