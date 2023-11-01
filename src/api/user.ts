import { api } from "@/api/config/axios";
import { CommentDTO, PostSummaryDTO } from "@/types/dtos";

async function getUserPosts(username: string): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/users/${username}/posts`);

  return response.data;
}

async function getUserComments(username: string): Promise<CommentDTO[]> {
  const response = await api.get<CommentDTO[]>(`/users/${username}/comments`);
  return response.data;
}

export { getUserPosts, getUserComments };
