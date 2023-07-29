import { Button, TextInput } from "@mantine/core";
import { useState } from "react";
import { createCommunity } from "../api/communities";
import { CreateCommunityDto } from "../types/dto";

function CreateCommunityPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.trim().length == 0 || description.trim().length == 0) return;

    const createCommunityDto: CreateCommunityDto = {
      name: name.trim(),
      description: description.trim(),
    };

    createCommunity(createCommunityDto);
  };

  return (
    <>
      <form
        className="shadow-md p-3 rounded-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <TextInput
          placeholder="Name"
          className="mb-5"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextInput
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button type="submit" className="mt-5">
          Submit
        </Button>
      </form>
    </>
  );
}

export default CreateCommunityPage;
