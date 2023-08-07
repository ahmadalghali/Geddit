import { useParams } from "react-router-dom";

function CommunityPage() {
  const { communityName } = useParams();

  return (
    <div>
      <h1>{communityName}</h1>
    </div>
  );
}

export default CommunityPage;
