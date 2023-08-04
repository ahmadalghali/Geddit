import { api } from "./index";
import { UserDTO, UserRegisterRequestDTO } from "../types/dto";

async function register(
  userRegisterRequestDTO: UserRegisterRequestDTO
): Promise<boolean> {
  const registerResponse = await api.post<UserDTO>(
    "/auth/register",
    userRegisterRequestDTO
  );

  return registerResponse.status == 201;
}

export { register };
