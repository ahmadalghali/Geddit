import { deleteComment, patchUpdateComment } from "@/api/comments";
import { getPostById, patchUpdatePost } from "@/api/posts";
import { CommentDTO, CreateCommentDTO, PostDTO, UpdateCommentDTO } from "@/types/dtos";
import { useEffect, useState } from "react";
import { deletePost as deletePostInApi } from "@/api/posts";
import { notify } from "@/lib/notifications";
import { createComment } from "@/api/post-comments";
import { createCommentReply } from "@/api/comment-replies";
import { downvotePost, removeVoteFromPost, upvotePost } from "@/api/post-votes";
import { downvoteComment, removeVoteFromComment, upvoteComment } from "@/api/comment-votes";
import useAuthModal from "@/hooks/useAuthModal";
import axios from "axios";

function usePost(postId: string) {
  const [post, setPost] = useState<PostDTO>();
  const [isLoading, setIsLoading] = useState(true);
  const { displayAuthModal } = useAuthModal();

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

  const addComment = async (createCommentDTO: CreateCommentDTO): Promise<boolean> => {
    try {
      const { data: createdComment, status } = await createComment({ postId, createCommentDTO });

      if (status == 201) {
        setPost((prevPost) => {
          if (!prevPost) return;

          const newComments = [createdComment, ...prevPost.comments];
          const updatePost: PostDTO = { ...prevPost, comments: newComments };

          return updatePost;
        });
        return true;
      } else {
        notify("Failed to add comment, something went wrong");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 403) {
          displayAuthModal();
        }
      } else {
        // stock error
      }
    }

    return Promise.reject();
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

  // const removeCommentReply = async (commentId: string, createCommentReplyDTO: CreateCommentDTO) => {
  //   const reply = await createCommentReply(commentId, createCommentReplyDTO);

  //   setPost((prevPost) => {
  //     if (!prevPost) return;

  //     const newComments = prevPost.comments.map((comment) => {
  //       if (comment.id === reply.parentCommentId) {
  //         comment.replies.unshift(reply);
  //       }
  //       return comment;
  //     });
  //     const updatePost: PostDTO = { ...prevPost, comments: newComments };

  //     return updatePost;
  //   });
  // };

  const deletePost = async () => {
    return await deletePostInApi(postId);
  };

  const handleUpvotePost = async () => {
    if (!post) return;

    let updatedPost: PostDTO;

    if (post.userVoteStatus == "UPVOTED") {
      updatedPost = await removeVoteFromPost(postId);
    } else {
      updatedPost = await upvotePost(postId);
    }

    setPost((prevPost) => {
      if (!prevPost) return;

      return updatedPost;
    });
  };

  const handleDownvotePost = async () => {
    if (!post) return;

    let updatedPost: PostDTO;

    if (post.userVoteStatus == "DOWNVOTED") {
      updatedPost = await removeVoteFromPost(postId);
    } else {
      updatedPost = await downvotePost(postId);
    }

    setPost((prevPost) => {
      if (!prevPost) return;

      return updatedPost;
    });
  };

  const handleUpvoteComment = async (commentId: string) => {
    let updatedComment: CommentDTO;
    const commentToUpdate = post?.comments.find((c) => c.id === commentId);
    if (!commentToUpdate) return;

    if (commentToUpdate.userVoteStatus == "UPVOTED") {
      updatedComment = await removeVoteFromComment(commentId);
    } else {
      updatedComment = await upvoteComment(commentId);
    }

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = prevPost.comments.map((comment) => {
        if (comment.id === commentId) {
          return updatedComment;
        }
        return comment;
      });

      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
  };

  const handleDownvoteComment = async (commentId: string) => {
    let updatedComment: CommentDTO;
    const commentToUpdate = post?.comments.find((c) => c.id === commentId);

    if (!commentToUpdate) return;

    if (commentToUpdate.userVoteStatus == "DOWNVOTED") {
      updatedComment = await removeVoteFromComment(commentId);
    } else {
      updatedComment = await downvoteComment(commentId);
    }

    setPost((prevPost) => {
      if (!prevPost) return;

      const newComments = prevPost.comments.map((comment) => {
        if (comment.id === commentId) {
          return updatedComment;
        }
        return comment;
      });

      const updatePost: PostDTO = { ...prevPost, comments: newComments };

      return updatePost;
    });
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
    addCommentReply,
    handleUpvotePost,
    handleDownvotePost,
    handleUpvoteComment,
    handleDownvoteComment,
  };
}

export default usePost;
