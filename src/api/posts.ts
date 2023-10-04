import { api } from "@/api/config/axios";
import { PostDTO, UpdatePostDTO } from "@/types/dtos";

async function getPostById(postId: string): Promise<PostDTO> {
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

export { getPostById, deletePost, patchUpdatePost };
