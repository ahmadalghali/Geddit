import { Post } from "../types";
import { api } from ".";
import { CreatePostDTO, PostDTO } from "../types/dto";

async function createPost(communityName: string, createPostDTO: CreatePostDTO): Promise<boolean> {
  const response = await api.post<Post>(`/communities/${communityName}/posts`, createPostDTO);
  return response.status === 201;
}

async function getAllPosts(communityName: string): Promise<PostDTO[]> {
  const response = await api.get<PostDTO[]>(`/communities/${communityName}/posts`);
  return response.data;
}

async function getPost(communityName: string, postId: string): Promise<PostDTO> {
  const response = await api.get<PostDTO>(`/communities/${communityName}/posts/${postId}`);
  return response.data;
}

export { createPost, getAllPosts, getPost };
