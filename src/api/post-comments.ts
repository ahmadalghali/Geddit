import { api } from "@/api/config/axios";
import { CommentDTO, CreateCommentDTO } from "@/types/dtos";

async function getPostComments(postId: string): Promise<CommentDTO[]> {
  const response = await api.get<CommentDTO[]>(`/posts/${postId}/comments`);
  return response.data;
}

async function createComment({ postId, createCommentDTO }: { postId: string; createCommentDTO: CreateCommentDTO }) {
  const response = await api.post<CommentDTO>(`/posts/${postId}/comments`, createCommentDTO);
  return response;
}

export { getPostComments, createComment };
