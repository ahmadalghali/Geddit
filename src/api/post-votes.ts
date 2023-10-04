import { api } from "@/api/config/axios";
import { PostDTO } from "@/types/dtos";

async function upvotePost(postId: string): Promise<PostDTO> {
  const response = await api.post<PostDTO>(`/posts/${postId}/upvote`);
  return response.data;
}

async function downvotePost(postId: string): Promise<PostDTO> {
  const response = await api.post<PostDTO>(`/posts/${postId}/downvote`);
  return response.data;
}

async function removeVoteFromPost(postId: string): Promise<PostDTO> {
  const response = await api.delete<PostDTO>(`/posts/${postId}/remove-vote`);
  return response.data;
}

export { downvotePost, removeVoteFromPost, upvotePost };
