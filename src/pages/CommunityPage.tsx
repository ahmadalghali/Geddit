import { useParams } from "react-router-dom";
import { CommunitySummaryDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import { Avatar, Button, Modal, Skeleton } from "@mantine/core";
import { IconBrandReddit, IconSend } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useDisclosure } from "@mantine/hooks";
import CreatePostForm from "@/features/posts/components/CreatePostForm";
import PostSummaryItemList from "@/features/posts/components/PostSummaryItemList";
import PostSummaryItemSkeleton from "@/features/posts/components/skeletons/PostSummaryItemSkeleton";
import useCommunity from "@/hooks/useCommunity";

function CommunityPage() {
  const { communityName } = useParams();
  const { community, posts, isLoading, handleJoinCommunity, handleLeaveCommunity } = useCommunity(communityName!);
  const [opened, { open, close }] = useDisclosure(false);

  const handleJoin = () => {
    handleJoinCommunity();
  };

  if (isLoading) return <PageSkeleton />;

  return (
    <>
      <Modal opened={opened} onClose={close} centered withCloseButton={false}>
        <CreatePostForm communityName={communityName} onDismiss={close} />
      </Modal>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <CommunityHeader community={community!} onJoin={handleJoin} onLeave={handleLeaveCommunity} />
          <Button radius='xl' w='100%' className='mb-8' variant='outline' onClick={open}>
            Create Post
          </Button>
          {posts.length ? (
            <PostSummaryItemList posts={posts} />
          ) : (
            <div className='flex-grow flex flex-col justify-center'>
              <NoPostsYet />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

function PageSkeleton() {
  return (
    <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <CommunityHeaderSkeleton />
      <br />
      <PostSummaryItemSkeleton count={10} />
    </motion.div>
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

function CommunityHeader({
  community,
  onLeave,
  onJoin,
}: {
  community: CommunitySummaryDTO;
  onJoin: () => void;
  onLeave: () => void;
}) {
  //

  const memberCountText = community.memberCount == 1 ? "1 member" : `${community.memberCount} members`;
  const isMember = community.isMember;

  return (
    <div className='mb-5'>
      <div className='flex items-center gap-2'>
        <Avatar radius='xl' color='violet' size={60}>
          <IconBrandReddit size={40} />
        </Avatar>
        <div>
          <p className='font-bold text-lg'>
            {Constants.PREFIX_COMMUNITY}
            {community?.name}
          </p>
          <p className='text-xs text-gray-500'>{memberCountText}</p>
        </div>

        {isMember ? (
          <Button
            radius={"xl"}
            variant='outline'
            sx={{
              width: "4.25rem",
              padding: "0",
              height: "2rem",
              marginLeft: "auto",
              fontWeight: "bold",
              fontSize: ".8rem",
            }}
            onClick={onLeave}
          >
            JOINED
          </Button>
        ) : (
          <Button
            radius={"xl"}
            sx={{
              width: "4.25rem",
              padding: "0",
              height: "2rem",
              marginLeft: "auto",
              fontWeight: "bold",
            }}
            onClick={onJoin}
          >
            JOIN
          </Button>
        )}
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
