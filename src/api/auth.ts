import { api } from "@/api/config/axios";
import { UserDTO, UserRegisterRequestDTO, UserSignInRequestDTO } from "@/types/dtos";

async function register(userRegisterRequestDTO: UserRegisterRequestDTO): Promise<boolean> {
  const registerResponse = await api.post<UserDTO>("/auth/register", userRegisterRequestDTO);
  return registerResponse.status == 201;
}

async function signIn(userSignInRequestDTO: UserSignInRequestDTO): Promise<UserDTO> {
  console.log("userSignInRequestDTO :>> ", userSignInRequestDTO);
  const signInResponse = await api.post<UserDTO>("/auth/sign-in", userSignInRequestDTO);
  console.log("signInResponse :>> ", signInResponse);

  if (signInResponse.status == 200) {
    const user = signInResponse.data;
    return user;
  }
  throw new Error("Could not sign in");
}
export { register, signIn };
