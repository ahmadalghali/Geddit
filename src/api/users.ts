import { api } from ".";
import { User } from "../types";
import { CreateUserDto } from "../types/dto";

async function createUser(createUserDto: CreateUserDto) {
  await api.post<User>("/auth", createUserDto);
}

export default createUser;
