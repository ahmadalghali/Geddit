import { api } from "@/api/config/axios";
import { UserDTO, UserRegisterRequestDTO, UserSignInRequestDTO, UserSignInResponseDTO } from "@/types/dtos";

async function signUp(userRegisterRequestDTO: UserRegisterRequestDTO): Promise<boolean> {
  const registerResponse = await api.post<UserDTO>("/auth/register", userRegisterRequestDTO);
  return registerResponse.status == 201;
}

async function signIn(userSignInRequestDTO: UserSignInRequestDTO): Promise<UserSignInResponseDTO> {
  const signInResponse = await api.post<UserSignInResponseDTO>("/auth/sign-in", userSignInRequestDTO, {
    withCredentials: true,
  });

  if (signInResponse.status == 200) {
    const user = signInResponse.data;
    return user;
  }
  throw new Error("Could not sign in");
}
export { signUp, signIn };
