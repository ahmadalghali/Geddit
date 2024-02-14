import { CreateCommentDTO } from "@/types/dtos";
import { IconBrandWechat } from "@tabler/icons-react";
import { Divider } from "@mantine/core";
import CommentSkeleton from "@/features/comments/components/skeletons/CommentSkeleton";
import { AnimatePresence } from "framer-motion";
import PostContentSkeleton from "@/features/posts/components/skeletons/PostContentSkeleton";
import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import DrawerEditText from "@/components/DrawerEditText";
import { usePostModalContext } from "@/contexts/PostModalContext";
import AddCommentBox from "@/features/comments/components/AddCommentBox";
import CommentsList from "@/features/comments/components/CommentsList";
import { usePostContext } from "@/contexts/PostContext";
import PostOptionsModal from "@/features/posts/components/PostOptionsModal";
import PostContent from "@/features/posts/components/PostContent";
import { useAuthContext } from "@/contexts/AuthContext";
import { useState } from "react";

function PostPage() {
  const { post, isLoading, addComment, updatePostBody } = usePostContext();
  const [commentBoxText, setCommentBoxText] = useState("");

  const { openPostOptionsModal, closeEditDrawer, editDrawerOpened } = usePostModalContext();

  const { user } = useAuthContext();

  const isAuthor = post?.author.id == user?.id;

  const handleAddComment = async (createCommentDTO: CreateCommentDTO) => {
    const added = await addComment(createCommentDTO);

    if (added) {
      setCommentBoxText("");
    }
  };

  if (isLoading) return <PostPageSkeleton />;

  if (!post) return <p>Post not found</p>;

  return (
    <AnimatePresence>
      <PostOptionsModal deletable={isAuthor} editable={isAuthor} key={"post-options-modal"} />

      <DrawerEditText
        close={closeEditDrawer}
        opened={editDrawerOpened}
        title={post.title}
        text={post.body}
        onSave={(updatedPostBody) => updatePostBody(updatedPostBody)}
        resource='post'
        key={"drawer-edit-text"}
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
          onSubmit={(createCommentDTO: CreateCommentDTO) => handleAddComment(createCommentDTO)}
          text={commentBoxText}
          onChange={(e) => setCommentBoxText(e.target.value)}
        />
        <Divider mb={20} size={"6"} color='rgb(234, 234, 234)' />

        <AnimatePresence mode='wait'>
          {post.comments.length ? <CommentsList comments={post.comments} isChild={false} /> : <NoCommentsYet />}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

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
  return <Skeleton height={140} radius={"md"} className='my-6' />;
}

export default PostPage;
