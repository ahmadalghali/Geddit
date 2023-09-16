import { deletePost } from "@/api/posts";
import { getUserPosts } from "@/api/user";
import ContentInteractions from "@/components/ContentInteractions";
import { Constants } from "@/lib/constants";
import { since } from "@/lib/utils/date-time";
import { PostSummaryDTO } from "@/types/dtos";
import { ActionIcon, Avatar, Divider, Modal, Skeleton, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandReddit, IconDots, IconPencil, IconTrash, IconUser } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserProfilePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<PostSummaryDTO[]>([]);

  const deletePostLocally = (postId: string) => {
    const updatedUserPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(updatedUserPosts);
  };

  useEffect(() => {
    const fetchUserPosts = async () => {
      setIsLoading(true);
      const posts = await getUserPosts("ahmad");
      setUserPosts(posts);

      setIsLoading(false);
    };

    fetchUserPosts();
  }, []);

  return (
    <div className=''>
      <UserDetails />
      <Tabs
        defaultValue='posts'
        classNames={{
          tabLabel: "font-semibold text-lg",
          tabsList: "fixed inset-x-0 bg-white z-20 pt-2",
          panel: "pt-14",
        }}
      >
        <Tabs.List grow>
          <Tabs.Tab value='posts'>Posts</Tabs.Tab>
          <Tabs.Tab value='comments'>Comments</Tabs.Tab>
          <Tabs.Tab value='about'>About</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='posts' className='  flex-grow '>
          <AnimatePresence>
            {isLoading ? (
              <PostItemSkeleton count={10} />
            ) : (
              <PostsList posts={userPosts} onDeletePost={deletePostLocally} />
            )}
          </AnimatePresence>
        </Tabs.Panel>

        <Tabs.Panel value='comments'>Comments tab content</Tabs.Panel>
        <Tabs.Panel value='about'>About tab content</Tabs.Panel>
      </Tabs>
    </div>
  );
}

function UserDetails() {
  return (
    <div className='p-6 bg-gradient-to-t from-green-950 to-lime-600'>
      <Avatar size='4rem' radius={"xl"} color={"gray"}>
        <IconUser size='40' />
      </Avatar>
      <div className='text-white mt-3'>
        <p className='font-bold text-2xl '>u/ahmad31</p>
        <div className='flex gap-2 font-bold text-sm mt-2'>
          <p>23 followers</p>
        </div>
      </div>
    </div>
  );
}

function PostsList({ posts, onDeletePost }: { posts: PostSummaryDTO[]; onDeletePost: (postId: string) => void }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <PostItem post={post} onDelete={onDeletePost} />
          <Divider size='lg' color='rgb(230, 230, 230)' />
        </li>
      ))}
    </ul>
  );
}

function PostItem({ post, onDelete }: { post: PostSummaryDTO; onDelete: (postId: string) => void }) {
  const formattedDate = since(post.createdDate);

  const [opened, { open, close }] = useDisclosure(false);

  const handlePostOptionsClicked = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.preventDefault();
    open();
  };
  const handleDelete = async () => {
    const deleted = await deletePost(post.id);
    if (deleted) {
      onDelete(post.id);
    }
    close();
  };
  const handleEdit = () => {
    close();
  };

  return (
    <>
      <PostOptionsModal opened={opened} close={close} onDelete={handleDelete} onEdit={handleEdit} />
      <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}/posts/${post.id}`}>
        <motion.div
          className='bg-white pt-2 pb-1 px-4 cursor-pointer sm:rounded-md hover:bg-zinc-100 transition-all'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className='flex items-center'>
            <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
              <IconBrandReddit size='25' />
            </Avatar>
            <p className='font-semibold text-sm'>
              {Constants.PREFIX_COMMUNITY}
              {post.communityName}
              <span className='text-xs font-semibold text-gray-400'>
                <span className='mx-1'>·</span>
                <span>{formattedDate}</span>
              </span>
            </p>

            <ActionIcon radius={"xl"} className='ml-auto'>
              <IconDots size='25' onClick={handlePostOptionsClicked} />
            </ActionIcon>
          </div>
          <p className='font-semibold'>{post.title}</p>

          <ContentInteractions commentCount={post.commentCount} onOptionsClicked={() => {}} />
        </motion.div>
      </Link>
    </>
  );
}

function PostOptionsModal({
  onDelete,
  onEdit,
  opened,
  close,
}: {
  opened: boolean;
  close: () => void;
  onDelete: () => void;
  onEdit: () => void;
}) {
  return (
    <Modal opened={opened} onClose={close} centered withCloseButton={false}>
      <ul className='divide-y-2'>
        <li className='flex items-center py-3 cursor-pointer ' onClick={onDelete}>
          <IconTrash />
          <p className='ml-3'>Delete</p>
        </li>
        <li className='flex items-center py-3 cursor-pointer ' onClick={onEdit}>
          <IconPencil />
          <p className='ml-3'>Edit</p>
        </li>
      </ul>
    </Modal>
  );
}

function PostItemSkeleton({ count }: { count: number }) {
  return (
    <ul className='space-y-1 h-full'>
      <AnimatePresence>
        {Array.from({ length: count }).map((_, index) => (
          <motion.li
            key={index}
            className=''
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className='px-5 pt-2 pb-3'>
              <Header />
              <Title />
              <ContentInteractionsSkeleton />
            </div>
            <Divider size='lg' color='rgb(230, 230, 230)' />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

function Header() {
  return (
    <div className='flex items-center mb-2'>
      <Skeleton height={35} circle className='mr-2' />
      <Skeleton height={15} width='200' />
    </div>
  );
}

function Title() {
  return <Skeleton height={18} width='90%' />;
}

function ContentInteractionsSkeleton() {
  return (
    <div className='mt-3'>
      <Skeleton height={18} width={220} />
    </div>
  );
}

export default UserProfilePage;
