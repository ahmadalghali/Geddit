import { Button, PasswordInput, TextInput } from "@mantine/core";
import { UserSignInRequestDTO } from "../types/dto";
import { signIn } from "../api/auth";

import { useState } from "react";

function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();

    if (usernameTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    const userSignInRequestDTO: UserSignInRequestDTO = {
      username: usernameTrimmed,
      password: passwordTrimmed,
    };
    signIn(userSignInRequestDTO);
  };
  return (
    <>
      <h1>Sign In</h1>
      <form
        className="shadow-md p-3 rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextInput
          className="mb-5"
          value={username}
          placeholder="Username"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <PasswordInput
          className="mb-5"
          value={password}
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Sign in</Button>
      </form>
    </>
  );
}

export default SignInPage;
