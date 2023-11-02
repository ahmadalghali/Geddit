import { api } from "@/api/config/axios";
import { CommentDTO, CreateCommentDTO } from "@/types/dtos";

async function createCommentReply(commentId: string, createCommentReplyDTO: CreateCommentDTO): Promise<CommentDTO> {
  const response = await api.post<CommentDTO>(`/comments/${commentId}/replies`, createCommentReplyDTO);

  return response.data;
}

// async function deleteCommentReply(commentId: string): Promise<boolean> {}

export { createCommentReply };
