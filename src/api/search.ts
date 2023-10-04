import { api } from "@/api/config/axios";
import { CommunitySummaryDTO, PostSummaryDTO, UserDTO } from "@/types/dtos";

async function searchCommunities(keyword: string): Promise<CommunitySummaryDTO[]> {
  const searchResponse = await api.get("/search/communities", {
    params: {
      keyword,
    },
  });

  return searchResponse.data;
}

async function searchPosts(keyword: string): Promise<PostSummaryDTO[]> {
  const searchResponse = await api.get("/search/posts", {
    params: {
      keyword,
    },
  });

  return searchResponse.data;
}

async function searchUsers(keyword: string): Promise<UserDTO[]> {
  const searchResponse = await api.get("/search/users", {
    params: {
      keyword,
    },
  });

  return searchResponse.data;
}

export { searchCommunities, searchPosts, searchUsers };
