import { api } from "@/api/config/axios";
import { AuthResponseDTO, UserRegisterRequestDTO, UserSignInRequestDTO } from "@/types/dtos";

async function signUp(userRegisterRequestDTO: UserRegisterRequestDTO): Promise<AuthResponseDTO> {
  const registerResponse = await api.post<AuthResponseDTO>("/auth/register", userRegisterRequestDTO, {
    withCredentials: true,
  });
  if (registerResponse.status == 201) {
    const user = registerResponse.data;
    return user;
  }
  throw new Error("Could not sign in");
}

async function signIn(userSignInRequestDTO: UserSignInRequestDTO): Promise<AuthResponseDTO> {
  const signInResponse = await api.post<AuthResponseDTO>("/auth/sign-in", userSignInRequestDTO, {
    withCredentials: true,
  });

  if (signInResponse.status == 200) {
    const user = signInResponse.data;
    return user;
  }
  throw new Error("Could not sign in");
}
export { signUp, signIn };
