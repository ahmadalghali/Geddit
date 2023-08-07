import { Post } from "../types";
import { api } from ".";
import { CreatePostDTO, PostDTO } from "../types/dto";

async function createPost(communityName: string, createPostDTO: CreatePostDTO): Promise<boolean> {
  const response = await api.post<Post>(`/communities/${communityName}/posts`, createPostDTO);
  return response.status === 201;
}

async function getAllPosts(communityId: string): Promise<PostDTO[]> {
  const response = await api.get<PostDTO[]>(`/communities/${communityId}/posts`);
  return response.data;
}

async function getPost(communityId: string, postId: string): Promise<PostDTO> {
  const response = await api.get<PostDTO>(`/communities/${communityId}/posts/${postId}`);
  return response.data;
}

export { createPost, getAllPosts, getPost };
