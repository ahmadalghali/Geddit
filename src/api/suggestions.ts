import { api } from ".";
import { PostSummaryDTO } from "../types/dto";

async function getSuggestedPosts(): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/suggestions/posts`);
  return response.data;
}

export { getSuggestedPosts };
