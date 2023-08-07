import { Button, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { CreateCommentDTO } from "../types/dto";

function AddCommentBox({ onSubmit }: { onSubmit: (createCommentDTO: CreateCommentDTO) => void }) {
  const [submittable, setSubmittable] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (text.trim().length == 0) {
      setSubmittable(false);
      return;
    }
    setSubmittable(true);
  }, [text]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ text: text, author: "Ahmad" });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Textarea
        placeholder='Add a comment'
        minRows={5}
        radius={"md"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='flex justify-end'>
        <Button type='submit' radius={"xl"} className='ml-auto mt-3' disabled={!submittable}>
          Reply
        </Button>
      </div>
    </form>
  );
}

export default AddCommentBox;
