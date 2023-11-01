import { deleteComment, patchUpdateComment } from "@/api/comments";
import { getPostById, patchUpdatePost } from "@/api/posts";
import { CommentDTO, CreateCommentDTO, PostDTO, UpdateCommentDTO } from "@/types/dtos";
import { useEffect, useState } from "react";
import { deletePost as deletePostInApi } from "@/api/posts";
import { notify } from "@/lib/notifications";
import { createComment } from "@/api/post-comments";
import { createCommentReply } from "@/api/comment-replies";
import { downvotePost, upvotePost } from "@/api/post-votes";
import { downvoteComment, upvoteComment } from "@/api/comment-votes";

function usePost(postId: string) {
  const [post, setPost] = useState<PostDTO>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      const post = await getPostById(postId);
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

  const addCommentReply = async (commentId: string, createCommentReplyDTO: CreateCommentDTO) => {
    const reply = await createCommentReply(commentId, createCommentReplyDTO);

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = prevPost.comments.map((comment) => {
        if (comment.id === reply.parentCommentId) {
          comment.replies.unshift(reply);
        }
        return comment;
      });
      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
  };

  const removeCommentReply = async (commentId: string, createCommentReplyDTO: CreateCommentDTO) => {
    const reply = await createCommentReply(commentId, createCommentReplyDTO);

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = prevPost.comments.map((comment) => {
        if (comment.id === reply.parentCommentId) {
          comment.replies.unshift(reply);
        }
        return comment;
      });
      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
  };

  const deletePost = async () => {
    return await deletePostInApi(postId);
  };

  const handleUpvotePost = async () => {
    const updatedPost = await upvotePost(postId);

    setPost((prevPost) => {
      if (!prevPost) return;

      return { ...prevPost, voteCount: updatedPost.voteCount };
    });
  };

  const handleDownvotePost = async () => {
    const updatedPost = await downvotePost(postId);

    setPost((prevPost) => {
      if (!prevPost) return;

      return { ...prevPost, voteCount: updatedPost.voteCount };
    });
  };

  const handleRemoveVoteFromPost = async () => {};

  const handleUpvoteComment = async (commentId: string) => {
    const updatedComment = await upvoteComment(commentId);

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = prevPost.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, voteCount: updatedComment.voteCount };
        }
        return comment;
      });

      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
  };

  const handleDownvoteComment = async (commentId: string) => {
    const updatedComment = await downvoteComment(commentId);

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = prevPost.comments.map((comment) => {
        if (comment.id === commentId) {
          return { ...comment, voteCount: updatedComment.voteCount };
        }
        return comment;
      });

      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
  };

  const handleRemoveVoteFromComment = async () => {};

  return {
    post,
    setPost,
    removeComment,
    isLoading,
    addComment,
    deletePost,
    updatePostBody,
    editComment,
    addCommentReply,
    handleUpvotePost,
    handleDownvotePost,
    handleUpvoteComment,
    handleDownvoteComment,
  };
}

export default usePost;
