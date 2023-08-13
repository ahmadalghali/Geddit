import { api } from "@/api/confi";
import { CreatePostDTO, PostDTO, PostSummaryDTO } from "@/types/dtos";

async function createPost(communityName: string, createPostDTO: CreatePostDTO): Promise<PostSummaryDTO> {
  const response = await api.post<PostSummaryDTO>(`/communities/${communityName}/posts`, createPostDTO);
  return response.data;
}

async function getAllPosts(communityName: string): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/communities/${communityName}/posts`);
  return response.data;
}

async function getPost(communityName: string, postId: string): Promise<PostDTO> {
  const response = await api.get<PostDTO>(`/communities/${communityName}/posts/${postId}`);
  return response.data;
}

export { createPost, getAllPosts, getPost };
