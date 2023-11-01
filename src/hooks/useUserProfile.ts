import { getUserComments, getUserPosts } from "@/api/user";
import { CommentDTO, PostSummaryDTO } from "@/types/dtos";
import { useEffect, useState } from "react";

function useUserProfile(username: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [userPosts, setUserPosts] = useState<PostSummaryDTO[]>([]);
  const [userComments, setUserComments] = useState<CommentDTO[]>([]);
  useEffect(() => {
    fetchUserPosts();
    fetchUserComments();
  }, [username]);

  const deletePostLocally = (postId: string) => {
    const updatedUserPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(updatedUserPosts);
  };

  const fetchUserPosts = async () => {
    setIsLoading(true);
    const posts = await getUserPosts(username!);
    setUserPosts(posts);

    setIsLoading(false);
  };

  const fetchUserComments = async () => {
    setIsLoading(true);
    const comments = await getUserComments(username!);
    setUserComments(comments);

    setIsLoading(false);
  };

  return {
    isLoading,
    userPosts,
    deletePostLocally,
    userComments,
    fetchUserComments,
    fetchUserPosts,
  };
}

export default useUserProfile;
