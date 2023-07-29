import { useParams } from "react-router-dom";

function CommunityPage() {
  const { community } = useParams();

  return (
    <div>
      <h1>{community}</h1>
    </div>
  );
}

export default CommunityPage;
