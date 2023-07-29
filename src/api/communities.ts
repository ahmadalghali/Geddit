import { Community } from "../types";
import { api } from "../api";
import { CreateCommunityDto } from "../types/dto";

async function search(keyword: string): Promise<Community[]> {
  const searchResponse = await api.get("/communities/search", {
    params: {
      name: keyword,
    },
  });

  const communities = searchResponse.data;

  return communities;
}

async function createCommunity(createCommunityDto: CreateCommunityDto) {
  const response = await api.post<Community>(
    "/communities",
    createCommunityDto
  );
  const createdCommunity = response.data;
  console.log(
    "🚀 ~ file: communities.ts:20 ~ createCommunity ~ createdCommunity:",
    createdCommunity
  );
}

export { search, createCommunity };
