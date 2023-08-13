import { useParams } from "react-router";
import AddCommentBox from "../components/AddCommentBox";
import { useEffect, useState } from "react";
import CommentsList from "../components/CommentsList";
import { createComment } from "../api/comments";
import { CreateCommentDTO, PostDTO } from "../types/dto";
import { getPost } from "../api/posts";
import { notifications } from "@mantine/notifications";
import { IconBrandReddit, IconBrandWechat } from "@tabler/icons-react";
import { Accordion, Avatar } from "@mantine/core";
import Constants from "../constants";
import ContentInteractions from "../components/ContentInteractions";
import { since } from "../utils/date-time";
import CommentSkeleton from "../components/skeletons/CommentSkeleton";
import { AnimatePresence } from "framer-motion";
import PostContentSkeleton from "../components/skeletons/PostContentSkeleton";
import Comment from "@/components/Comment";
function PostPage() {
  const { communityName, postId } = useParams();

  const [post, setPost] = useState<PostDTO>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      if (!communityName || !postId) return;

      const post = await getPost(communityName, postId);
      setPost(post);
      setIsLoading(false);
    })();
  }, [postId, communityName]);

  const handleSubmitComment = async (createCommentDTO: CreateCommentDTO) => {
    if (communityName && postId) {
      const comment = await createComment(communityName, postId, createCommentDTO);

      if (comment) {
        setPost((prevPost) => {
          if (!prevPost) return;

          const newComments = [comment, ...prevPost.comments];
          const updatePost: PostDTO = { ...prevPost, comments: newComments };

          return updatePost;
        });
      } else {
        notifications.show({
          title: "Something went wrong",
          message: "Failed to send comment, please try again later.",
          autoClose: true,
          color: "red",
        });
      }
    }
  };

  return (
    <div className='bg-white'>
      <AnimatePresence>{isLoading ? <PostContentSkeleton /> : <PostContent post={post!} />}</AnimatePresence>
      <AddCommentBox
        className='mt-5'
        onSubmit={(createCommentDTO: CreateCommentDTO) => handleSubmitComment(createCommentDTO)}
      />

      <AnimatePresence mode='wait'>
        {isLoading ? (
          <CommentSkeleton count={10} />
        ) : (
          <>
            {post?.comments.length ? (
              <CommentsList
                comments={post.comments.sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate))}
                isChild={false}
              />
            ) : (
              <NoCommentsYet />
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );

  function PostContent({ post }: { post: PostDTO }) {
    return (
      <div className=''>
        <div className='flex items-center gap-2'>
          <Avatar size={50} radius='xl' className='' color={"green"}>
            <IconBrandReddit size='25' />
          </Avatar>
          <div className=''>
            <p className='font-semibold'>
              {Constants.PREFIX_COMMUNITY}
              {post.communityName}
            </p>

            <p className='text-[.8rem] font-semibold text-gray-500'>
              {Constants.PREFIX_USER}
              {"testuser"}
              <span>
                <span className='mx-1'>·</span>
                <span>{since(post.createdDate)}</span>
              </span>
            </p>
          </div>
        </div>
        <h1 className='font-semibold text-2xl mt-4'>{post.title}</h1>
        {post.body && <p className='mt-10 whitespace-pre-line'>{post.body}</p>}

        <ContentInteractions commentCount={post.comments.length} className='mt-5' />
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

export default PostPage;
