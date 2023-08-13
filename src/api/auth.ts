import { api } from "./index";
import {
  UserDTO,
  UserRegisterRequestDTO,
  UserSignInRequestDTO,
} from "../types/dto";

async function register(
  userRegisterRequestDTO: UserRegisterRequestDTO
): Promise<boolean> {
  const registerResponse = await api.post<UserDTO>(
    "/auth/register",
    userRegisterRequestDTO
  );

  return registerResponse.status == 201;
}

async function signIn(
  userSignInRequestDTO: UserSignInRequestDTO
): Promise<boolean> {
  const signInResponse = await api.post<UserDTO>(
    "/auth/sign-in",
    userSignInRequestDTO
  );
  return signInResponse.status == 200;
}
export { register, signIn };
