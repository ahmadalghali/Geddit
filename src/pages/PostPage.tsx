import { useParams } from "react-router";
import AddCommentBox from "../components/AddCommentBox";
import { useEffect, useState } from "react";
import CommentsList from "../components/CommentsList";
import { createComment } from "../api/comments";
import { CreateCommentDTO, PostDTO } from "../types/dto";
import { getPost } from "../api/posts";
import { notifications } from "@mantine/notifications";

function PostPage() {
  const { communityName, postId } = useParams();

  // Fetch post from url

  const [post, setPost] = useState<PostDTO>();
  useEffect(() => {
    (async () => {
      if (!communityName || !postId) return;

      const post = await getPost(communityName, postId);
      setPost(post);
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
      {/* <PostContent /> */}
      {post && (
        <>
          <h1>{post.title}</h1>
          <p className='my-10 whitespace-pre-line'>{post.body}</p>
          <AddCommentBox onSubmit={(createCommentDTO: CreateCommentDTO) => handleSubmitComment(createCommentDTO)} />
          <CommentsList comments={post.comments} isChild={false} />
        </>
      )}
    </div>
  );
}

export default PostPage;
