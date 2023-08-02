import { Community } from "../types";
import { api } from ".";
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

async function getAllCommunities(): Promise<Community[]> {
  const response = await api.get("/communities");

  return response.data;
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

async function getCommunityByName(communityName: string): Promise<Community> {
  const CommunityResponse = await api.get("/communities/" + communityName, {
  });

  return CommunityResponse.data;
}

export { search, getAllCommunities, createCommunity , getCommunityByName};
