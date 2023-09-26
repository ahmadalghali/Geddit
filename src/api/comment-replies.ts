import { api } from "@/api/config";
import { CommentDTO, CreateCommentDTO } from "@/types/dtos";

async function createCommentReply(commentId: string, createCommentReplyDTO: CreateCommentDTO): Promise<CommentDTO> {
  const response = await api.post<CommentDTO>(`/comments/${commentId}/replies`, createCommentReplyDTO);

  return response.data;
}

export { createCommentReply };
