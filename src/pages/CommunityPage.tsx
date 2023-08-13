import { useEffect, useState } from "react";
import { getCommunityByName } from "@/api/communities";
import { useParams } from "react-router-dom";
import PostSummaryItemList from "@/components/PostSummaryItemList";
import { CommunitySummaryDTO, PostSummaryDTO } from "@/types/dtos";
import { getAllPosts } from "@/api/posts";
import { Constants } from "@/lib/constants";
import { Avatar, Button, Skeleton } from "@mantine/core";
import { IconBrandReddit, IconSend } from "@tabler/icons-react";
import PostSummaryItemSkeleton from "@/components/skeletons/PostSummaryItemSkeleton";

function CommunityPage() {
  const [community, setCommunity] = useState<CommunitySummaryDTO | null>(null);
  const [posts, setPosts] = useState<PostSummaryDTO[]>([]);
  const { communityName } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (communityName) {
      const fetchCommunity = async () => {
        return await getCommunityByName(communityName);
      };

      const fetchCommunityPosts = async () => {
        return await getAllPosts(communityName);
      };

      Promise.all([fetchCommunity(), fetchCommunityPosts()]).then(([community, posts]) => {
        setCommunity(community);
        setPosts(posts);
        setIsLoading(false);
      });
    }
  }, [communityName]);

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <CommunityHeader community={community} />
      {posts.length ? (
        <PostSummaryItemList posts={posts} />
      ) : (
        <div className='flex-grow flex flex-col justify-center'>
          <NoPostsYet />
        </div>
      )}
    </>
  );
}

function PageSkeleton() {
  return (
    <>
      <CommunityHeaderSkeleton />
      <br />
      <PostSummaryItemSkeleton count={10} />
    </>
  );
}
function CommunityHeaderSkeleton() {
  return (
    <>
      <div className='flex items-center gap-2'>
        <Skeleton circle height={60} />
        <div className='space-y-2'>
          <Skeleton height={18} width={150} />
          <Skeleton height={13} width={100} />
        </div>
        <Skeleton width={70} height={35} radius={"xl"} className='ml-auto' />
      </div>
      <Skeleton height={12} width='100%' className='mt-2' />
      <Skeleton height={12} width='40%' className='mt-2' />
    </>
  );
}

function CommunityHeader({ community }: { community: CommunitySummaryDTO }) {
  return (
    <div className='mb-10'>
      <div className='flex items-center gap-2'>
        <Avatar radius='xl' color='violet' size={60}>
          <IconBrandReddit size={40} />
        </Avatar>
        <div>
          <p className='font-bold text-lg'>
            {Constants.PREFIX_COMMUNITY}
            {community?.name}
          </p>
          <p className='text-xs text-gray-500'>42 members</p>
        </div>

        <Button
          radius={"xl"}
          sx={{
            width: "4.25rem",
            padding: "0",
            height: "2rem",
            marginLeft: "auto",
            fontWeight: "bold",
          }}
        >
          JOIN
        </Button>
      </div>
      <p className='text-xs text-gray-500 mt-4'>{community?.description}</p>
    </div>
  );
}
function NoPostsYet() {
  return (
    <div className='flex flex-col items-center mt-20 gap-5 opacity-40'>
      <IconSend size={50} strokeWidth={1.5} />
      <p className='font-bold text-lg'>Be the first to make a post!</p>
    </div>
  );
}

export default CommunityPage;
