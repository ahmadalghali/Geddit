import { api } from ".";
import { CommentDTO, CreateCommentDTO } from "../types/dto";

async function getComments(communityName: string, postId: string): Promise<CommentDTO[]> {
  const response = await api.get<CommentDTO[]>(`/communities/${communityName}/posts/${postId}/comments`);
  return response.data;
}

async function createComment(
  communityName: string,
  postId: string,
  createCommentDTO: CreateCommentDTO
): Promise<CommentDTO> {
  const response = await api.post<CommentDTO>(
    `/communities/${communityName}/posts/${postId}/comments`,
    createCommentDTO
  );

  return response.data;
}

export { getComments, createComment };
