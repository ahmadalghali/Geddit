import { api } from "@/api/config/axios";
import { AuthResponseDTO, UserRegisterRequestDTO, UserSignInRequestDTO } from "@/types/dtos";
import { AxiosResponse } from "axios";

function signUp(userRegisterRequestDTO: UserRegisterRequestDTO): Promise<AxiosResponse<AuthResponseDTO, unknown>> {
  return api.post<AuthResponseDTO>("/auth/register", userRegisterRequestDTO, {
    withCredentials: true,
  });
}

function signIn(userSignInRequestDTO: UserSignInRequestDTO): Promise<AxiosResponse<AuthResponseDTO, unknown>> {
  return api.post<AuthResponseDTO>("/auth/sign-in", userSignInRequestDTO, {
    withCredentials: true,
  });
}
export { signUp, signIn };
