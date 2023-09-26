import { useEffect, useState } from "react";
import { PostSummaryDTO } from "@/types/dtos";
import { getSuggestedPosts } from "@/api/suggestions";
import PostSummaryItemSkeleton from "@/components/skeletons/PostSummaryItemSkeleton";
import PageTitle from "@/components/PageTitle";
import PostSummaryItemList from "@/features/posts/components/PostSummaryItemList";

function LandingPage() {
  const [suggestedPosts, setSuggestedPosts] = useState<PostSummaryDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const posts = await getSuggestedPosts();
      setSuggestedPosts(posts);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div>
      <PageTitle>What's happening recently</PageTitle>
      {isLoading ? <PostSummaryItemSkeleton count={5} /> : <PostSummaryItemList posts={suggestedPosts} />}
    </div>
  );
}

export default LandingPage;
