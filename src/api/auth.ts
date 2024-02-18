import { api } from "@/api/config/axios";
import { AuthResponseDTO, UserRegisterRequestDTO, UserSignInRequestDTO } from "@/types/dtos";
import { AxiosResponse } from "axios";

const BASE_MAPPING = "/auth";

function signUp(userRegisterRequestDTO: UserRegisterRequestDTO): Promise<AxiosResponse<AuthResponseDTO, unknown>> {
  return api.post<AuthResponseDTO>(`${BASE_MAPPING}/register`, userRegisterRequestDTO, {
    withCredentials: true,
  });
}

function signIn(userSignInRequestDTO: UserSignInRequestDTO): Promise<AxiosResponse<AuthResponseDTO, unknown>> {
  return api.post<AuthResponseDTO>(`${BASE_MAPPING}/sign-in`, userSignInRequestDTO, {
    withCredentials: true,
  });
}

function temporaryDemoSignIn(): Promise<AxiosResponse<AuthResponseDTO, unknown>> {
  return api.post<AuthResponseDTO>(`${BASE_MAPPING}/temporary-demo-sign-in`);
}

export { signUp, signIn, temporaryDemoSignIn };
