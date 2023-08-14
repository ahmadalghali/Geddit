import { Community } from "@/types/entities";
import { api } from "@/api/config";
import { CommunitySummaryDTO, CreateCommunityDTO } from "@/types/dtos";

async function search(keyword: string): Promise<CommunitySummaryDTO[]> {
  const searchResponse = await api.get("/communities/search", {
    params: {
      name: keyword,
    },
  });

  const communities = searchResponse.data;

  return communities;
}

async function getAllCommunities(): Promise<CommunitySummaryDTO[]> {
  const response = await api.get("/communities");

  return response.data;
}

async function createCommunity(createCommunityDTO: CreateCommunityDTO): Promise<Community> {
  const response = await api.post<Community>("/communities", createCommunityDTO);
  return response.data;
}

async function getCommunityByName(communityName: string): Promise<CommunitySummaryDTO> {
  const communityResponse = await api.get(`/communities/${communityName}`);

  return communityResponse.data;
}

export { search, getAllCommunities, createCommunity, getCommunityByName };
