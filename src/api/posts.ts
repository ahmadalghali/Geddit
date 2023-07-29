import { CreatePostDto, Post } from "../types";
import { api } from ".";

async function createPost(communityId: string, createPostDto: CreatePostDto) {
  const createPostResponse = await api.post<Post>(`/communities/${communityId}/posts`, createPostDto);

  console.log("🚀 ~ file: posts.ts:8 ~ createPost ~ createPostResponse:", createPostResponse.data);
}

export { createPost };
