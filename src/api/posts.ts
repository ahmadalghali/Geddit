import { api } from "@/api/config";
import { CommentDTO, PostDTO, UpdatePostDTO } from "@/types/dtos";

async function getPost(postId: string): Promise<PostDTO> {
  const response = await api.get<PostDTO>(`/posts/${postId}`);
  return response.data;
}

async function deletePost(postId: string): Promise<boolean> {
  const response = await api.delete(`/posts/${postId}`);
  const deleted = response.status == 200;
  return deleted;
}

async function patchUpdatePost(postId: string, updatePostDTO: UpdatePostDTO): Promise<PostDTO> {
  const response = await api.patch<PostDTO>(`/posts/${postId}`, updatePostDTO);
  return response.data;
}

async function getPostComments(postId: string): Promise<CommentDTO[]> {
  const response = await api.get<CommentDTO[]>(`/posts/${postId}/comments`);
  return response.data;
}

export { getPost, deletePost, patchUpdatePost, getPostComments };
