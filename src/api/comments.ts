import { api } from "@/api/config";
import { CommentDTO, UpdateCommentDTO } from "@/types/dtos";

async function deleteComment(commentId: string): Promise<boolean> {
  const response = await api.delete(`/comments/${commentId}`);
  return response.status == 200;
}

async function patchUpdateComment(commentId: string, updateCommentDTO: UpdateCommentDTO): Promise<CommentDTO> {
  const response = await api.patch<CommentDTO>(`/comments/${commentId}`, updateCommentDTO);
  return response.data;
}

export { deleteComment, patchUpdateComment };
