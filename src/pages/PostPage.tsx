import { useParams } from "react-router";
import { CreateCommentDTO, PostDTO } from "@/types/dtos";
import { IconBrandReddit, IconBrandWechat, IconPencil, IconShare, IconTrash } from "@tabler/icons-react";
import { Avatar, Divider } from "@mantine/core";
import ContentInteractions from "@/components/ContentInteractions";
import { since } from "@/lib/utils/date-time";
import CommentSkeleton from "@/components/skeletons/CommentSkeleton";
import { AnimatePresence } from "framer-motion";
import PostContentSkeleton from "@/components/skeletons/PostContentSkeleton";
import { Constants } from "@/lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import OptionsModal from "@/components/OptionsModal";
import { useCopyToClipboard } from "react-use";
import { notify } from "@/lib/notifications";
import { modals } from "@mantine/modals";
import DrawerEditText from "@/components/DrawerEditText";
import { usePostModalContext } from "@/contexts/PostModalContext";
import AddCommentBox from "@/features/comments/components/AddCommentBox";
import CommentsList from "@/features/comments/components/CommentsList";
import { usePostContext } from "@/contexts/PostContext";

function PostPage() {
  const { post, isLoading, addComment, updatePostBody } = usePostContext();

  const { openPostOptionsModal, closeEditDrawer, editDrawerOpened } = usePostModalContext();

  if (isLoading) return <PostPageSkeleton />;

  if (!post) return <p>Post not found</p>;

  return (
    <AnimatePresence>
      <PostOptionsModal />

      <DrawerEditText
        close={closeEditDrawer}
        opened={editDrawerOpened}
        title={post.title}
        text={post.body}
        onSave={(updatedPostBody) => updatePostBody(updatedPostBody)}
        resource='post'
      />
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
        <PostContent
          post={post}
          onOptionsClicked={() => {
            openPostOptionsModal();
          }}
        />
        <AddCommentBox
          className='my-5'
          onSubmit={(createCommentDTO: CreateCommentDTO) => addComment(createCommentDTO)}
        />
        <Divider mb={20} size={"md"} color='rgb(234, 234, 234)' />

        <AnimatePresence mode='wait'>
          {post.comments.length ? (
            <CommentsList
              comments={post.comments.sort(
                (a, b) => new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf()
              )}
              isChild={false}
            />
          ) : (
            <NoCommentsYet />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

  function PostContent({ post, onOptionsClicked }: { post: PostDTO; onOptionsClicked: () => void }) {
    return (
      <div className=''>
        <div className='flex items-center gap-2'>
          <Avatar size={50} radius='xl' className='' color={"green"}>
            <IconBrandReddit size='25' />
          </Avatar>
          <div className=''>
            <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}`}>
              <p className='font-semibold'>
                {Constants.PREFIX_COMMUNITY}
                {post.communityName}
              </p>
            </Link>

            <p className='text-[.8rem] font-semibold text-gray-500'>
              {Constants.PREFIX_USER}
              {post.authorUsername}
              <span>
                <span className='mx-1'>·</span>
                <span>{since(post.createdDate)}</span>
              </span>
            </p>
          </div>
        </div>
        <h1 className='font-semibold text-2xl mt-4'>{post.title}</h1>
        {post.body && <p className='mt-10 whitespace-pre-line break-words'>{post.body}</p>}
        <ContentInteractions commentCount={post.comments.length} className='mt-5' onOptionsClicked={onOptionsClicked} />
      </div>
    );
  }

  function NoCommentsYet() {
    return (
      <div className='flex flex-col items-center mt-20 gap-5 opacity-40'>
        <IconBrandWechat size={60} strokeWidth={1.5} />
        <p className='font-bold text-lg'>Be the first to comment</p>
      </div>
    );
  }
}

const PostPageSkeleton = () => (
  <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <PostContentSkeleton />
    <CommentBoxSkeleton />
    <CommentSkeleton count={10} />
  </motion.div>
);

function CommentBoxSkeleton() {
  return <Skeleton height={160} radius={"md"} className='my-6' />;
}

function PostOptionsModal() {
  const { communityName } = useParams();

  const { closePostOptionsModal, postOptionsModalOpened, openEditDrawer } = usePostModalContext();

  const navigate = useNavigate();
  const [, copyToClipboard] = useCopyToClipboard();
  const { deletePost } = usePostContext();

  const handleShare = () => {
    copyToClipboard(window.location.href);
    closePostOptionsModal();
    notify("Post link copied to clipboard");
  };

  const handleDeletePost = async () => {
    const deleted = await deletePost();

    if (deleted) {
      navigate(`/${Constants.PREFIX_COMMUNITY}${communityName}`);
    }

    notify("Post deleted successfully");
  };

  const openDeletePostModal = () =>
    modals.openConfirmModal({
      title: "Delete post",
      centered: true,
      children: <p>Are you sure you want to delete this post? You will not be able to undo this action.</p>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDeletePost(),
    });

  const handleDelete = () => {
    closePostOptionsModal();
    openDeletePostModal();
  };
  const handleEdit = () => {
    closePostOptionsModal();
    openEditDrawer();
  };

  return (
    <OptionsModal close={closePostOptionsModal} opened={postOptionsModalOpened}>
      <OptionsModal.Item onClick={handleShare} icon={<IconShare />}>
        Share
      </OptionsModal.Item>
      <OptionsModal.Item onClick={handleEdit} icon={<IconPencil />}>
        Edit
      </OptionsModal.Item>
      <OptionsModal.Item onClick={handleDelete} icon={<IconTrash />}>
        Delete
      </OptionsModal.Item>
    </OptionsModal>
  );
}

export default PostPage;
