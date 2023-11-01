import { Community } from "@/types/entities";
import { api } from "@/api/config/axios";
import { CommunitySummaryDTO, CreateCommunityDTO } from "@/types/dtos";

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

async function joinCommunity(communityName: string): Promise<number> {
  const response = await api.post<number>(`/communities/${communityName}/join`);
  const updatedCommunityMemberCount = response.data;
  return updatedCommunityMemberCount;
}

async function leaveCommunity(communityName: string): Promise<number> {
  const response = await api.delete<number>(`/communities/${communityName}/leave`);
  const updatedCommunityMemberCount = response.data;
  return updatedCommunityMemberCount;
}

export { getAllCommunities, createCommunity, getCommunityByName, joinCommunity, leaveCommunity };
