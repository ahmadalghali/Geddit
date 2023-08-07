import { useEffect, useState } from "react";
import PostList from "../components/PostSummaryItemList";
import { PostSummaryDTO } from "../types/dto";
import { getSuggestedPosts } from "../api/suggestions";

function LandingPage() {
  const [suggestedPosts, setSuggestedPosts] = useState<PostSummaryDTO[]>([]);

  useEffect(() => {
    (async () => {
      const posts = await getSuggestedPosts();
      setSuggestedPosts(posts);
    })();
  }, []);

  return (
    <div>
      <h1 className='mb-10'>What's happening recently</h1>
      <PostList posts={suggestedPosts} />
    </div>
  );
}

export default LandingPage;
