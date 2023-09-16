import { api } from "@/api/config";
import { CreatePostDTO, PostSummaryDTO } from "@/types/dtos";

async function createCommunityPost(communityName: string, createPostDTO: CreatePostDTO): Promise<PostSummaryDTO> {
  const response = await api.post<PostSummaryDTO>(`/communities/${communityName}/posts`, createPostDTO);
  return response.data;
}

async function getCommunityPosts(communityName: string): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/communities/${communityName}/posts`);
  return response.data;
}

export { createCommunityPost, getCommunityPosts };
