import { api } from "@/api/config";
import { CommentDTO, CreateCommentDTO, UpdateCommentDTO } from "@/types/dtos";

async function getComments(communityName: string, postId: string): Promise<CommentDTO[]> {
  const response = await api.get<CommentDTO[]>(`/communities/${communityName}/posts/${postId}/comments`);
  return response.data;
}

async function createComment(postId: string, createCommentDTO: CreateCommentDTO): Promise<CommentDTO> {
  const response = await api.post<CommentDTO>(`/posts/${postId}/comments`, createCommentDTO);

  return response.data;
}

async function deleteComment(commentId: string): Promise<boolean> {
  const response = await api.delete(`/comments/${commentId}`);
  return response.status == 200;
}

async function patchUpdateComment(commentId: string, updateCommentDTO: UpdateCommentDTO): Promise<CommentDTO> {
  const response = await api.patch<CommentDTO>(`/comments/${commentId}`, updateCommentDTO);
  return response.data;
}

export { getComments, createComment, deleteComment, patchUpdateComment };
