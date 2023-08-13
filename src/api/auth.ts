import { api } from "@/api/config";
import { UserDTO, UserRegisterRequestDTO } from "@/types/dtos";

async function register(userRegisterRequestDTO: UserRegisterRequestDTO): Promise<boolean> {
  const registerResponse = await api.post<UserDTO>("/auth/register", userRegisterRequestDTO);

  return registerResponse.status == 201;
}

export { register };
