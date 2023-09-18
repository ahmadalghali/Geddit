import { api } from "@/api/config";
import { PostSummaryDTO } from "@/types/dtos";

async function getUserPostsByUsername(username: string): Promise<PostSummaryDTO[]> {
  const response = await api.get<PostSummaryDTO[]>(`/users/${username}/posts`);

  return response.data;
}
export { getUserPostsByUsername };
