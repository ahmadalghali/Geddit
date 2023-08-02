import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { CreateUserDto } from "../types/dto";
import createUser from "../api/users";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (username.trim().length == 0 || password.trim().length == 0) return;

    const createUserDto: CreateUserDto = {
      username: username.trim(),
      password: password.trim(),
    };

    createUser(createUserDto);
  };
  return (
    <>
      <h1>Create account</h1>
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
        <Button type="submit">Sign up</Button>
      </form>
    </>
  );
}

export default RegisterPage;
