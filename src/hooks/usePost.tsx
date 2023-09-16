import { createComment, deleteComment, patchUpdateComment } from "@/api/comments";
import { getPost, patchUpdatePost } from "@/api/posts";
import { CommentDTO, CreateCommentDTO, PostDTO, UpdateCommentDTO } from "@/types/dtos";
import { useEffect, useState } from "react";
import { deletePost as deletePostInApi } from "@/api/posts";
import { notifications } from "@mantine/notifications";
import AppNotificationMessage from "@/components/AppNotification";
import { notify } from "@/lib/notifications";

function usePost(postId: string) {
  const [post, setPost] = useState<PostDTO>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const post = await getPost(postId);
      setPost(post);
      setIsLoading(false);
    })();
  }, [postId]);

  const removeComment = async (commentId: string) => {
    if (!post) return;
    const deleted = await deleteComment(commentId);

    if (!deleted) return;

    const updatedPost: PostDTO = {
      ...post,
      comments: post.comments.filter((comment) => comment.id !== commentId),
    };

    setPost(updatedPost);

    notify("Comment deleted successfully");
  };

  const updatePostBody = async (updatedPostBody: string) => {
    const updatedPost = await patchUpdatePost(post!.id, { body: updatedPostBody });
    setPost(updatedPost);
  };

  const editComment = async (commentId: string, updateCommentDTO: UpdateCommentDTO) => {
    if (!post) return;
    const updatedComment = await patchUpdateComment(commentId, updateCommentDTO);
    const updateCommentList: CommentDTO[] = post.comments.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          text: updatedComment.text,
        };
      }
      return comment;
    });

    const updatedPost: PostDTO = {
      ...post,
      comments: updateCommentList,
    };

    setPost(updatedPost);
  };

  const addComment = async (createCommentDTO: CreateCommentDTO) => {
    const comment = await createComment(postId, createCommentDTO);

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = [comment, ...prevPost.comments];
      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
  };

  const deletePost = async () => {
    return await deletePostInApi(postId);
  };

  return {
    post,
    setPost,
    removeComment,
    isLoading,
    addComment,
    deletePost,
    updatePostBody,
    editComment,
  };
}

export default usePost;
