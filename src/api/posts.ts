import { CreatePostDto, Post } from "../types";
import { api } from ".";
import { PostDto } from "../types/dto";

async function createPost(communityId: string, createPostDto: CreatePostDto) {
  const createPostResponse = await api.post<Post>(`/communities/${communityId}/posts`, createPostDto);
}

async function getPost(communityName: string, postId: string) {
  const getPostResponse = await api.get<PostDto>(`/communities/${communityName}/posts/${postId}`);
  console.log('getPostResponse.data', getPostResponse.data)
  return getPostResponse.data;
}
export { createPost, getPost};
