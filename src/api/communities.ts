import { Community } from "../types";
import { api } from "../api";

async function search(keyword: string): Promise<Community[]> {
  const searchResponse = await api.get("/communities/search", {
    params: {
      name: keyword,
    },
  });

  const communities = searchResponse.data;

  return communities;
}

export { search };
