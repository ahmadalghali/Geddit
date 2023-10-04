import { api } from "@/api/config/axios";
import { CommentDTO } from "@/types/dtos";

async function upvoteComment(commentId: string): Promise<CommentDTO> {
  const response = await api.post<CommentDTO>(`/comments/${commentId}/upvote`);
  return response.data;
}

async function downvoteComment(commentId: string): Promise<CommentDTO> {
  const response = await api.post<CommentDTO>(`/comments/${commentId}/downvote`);
  return response.data;
}

async function removeVoteFromComment(commentId: string): Promise<CommentDTO> {
  const response = await api.delete<CommentDTO>(`/comments/${commentId}/remove-vote`);
  return response.data;
}

export { downvoteComment, removeVoteFromComment, upvoteComment };
