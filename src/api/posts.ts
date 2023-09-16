import { api } from "@/api/config";
import { CreatePostDTO, PostDTO, PostSummaryDTO, UpdatePostDTO } from "@/types/dtos";

async function createPost(communityName: string, createPostDTO: CreatePostDTO): Promise<PostSummaryDTO> {
  const response = await api.post<PostSummaryDTO>(`/communities/${communityName}/posts`, createPostDTO);
  return response.data;
}

async function getAllPosts(communityName: string): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/communities/${communityName}/posts`);
  return response.data;
}

async function getPost(postId: string): Promise<PostDTO> {
  const response = await api.get<PostDTO>(`/posts/${postId}`);
  return response.data;
}

async function deletePost(postId: string): Promise<boolean> {
  const response = await api.delete(`/posts/${postId}`);
  const deleted = response.status == 200;
  return deleted;
}

async function patchUpdatePost(postId: string, updatePostDTO: UpdatePostDTO): Promise<PostDTO> {
  const response = await api.patch<PostDTO>(`/posts/${postId}`, updatePostDTO);
  return response.data;
}

export { createPost, getAllPosts, getPost, deletePost, patchUpdatePost };
