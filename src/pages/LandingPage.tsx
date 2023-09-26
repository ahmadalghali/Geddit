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

  if (isLoading) return <PostSummaryItemSkeleton count={5} />;
  return (
    <>
      <PageTitle>What's happening recently</PageTitle>
      <PostSummaryItemList posts={suggestedPosts} />
    </>
  );
}

export default LandingPage;
