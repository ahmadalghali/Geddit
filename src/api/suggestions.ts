import { api } from "@/api/config/axios";
import { PostSummaryDTO } from "@/types/dtos";

async function getSuggestedPosts(): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/suggestions/posts`);
  return response.data;
}

export { getSuggestedPosts };
