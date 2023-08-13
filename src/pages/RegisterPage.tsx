import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { UserRegisterRequestDTO } from "../types/dto";
import { register } from "../api/auth";
import PageTitle from "../components/PageTitle";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();

    if (usernameTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    const userRegisterRequestDTO: UserRegisterRequestDTO = {
      username: usernameTrimmed,
      password: passwordTrimmed,
    };

    register(userRegisterRequestDTO);
  };
  return (
    <>
      <PageTitle>Create account</PageTitle>
      <form className='shadow-md p-3 rounded-md' onSubmit={(e) => handleSubmit(e)}>
        <TextInput
          className='mb-5'
          value={username}
          placeholder='Username'
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          className='mb-5'
          value={password}
          placeholder='Password'
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type='submit'>Sign up</Button>
      </form>
    </>
  );
}

export default RegisterPage;
