import { Button, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { CreateCommentDTO } from "@/types/dtos";
import { cn } from "@/lib/utils/classname";

function AddCommentBox({
  onSubmit,
  className,
}: {
  className: string;
  onSubmit: (createCommentDTO: CreateCommentDTO) => void;
}) {
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
    onSubmit({ text: text });
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className={cn("", className)}>
      <Textarea
        placeholder='Add a comment'
        minRows={5}
        radius={"md"}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className='flex justify-end'>
        <Button
          type='submit'
          radius={"xl"}
          className='ml-auto mt-3 transition-all duration-300'
          disabled={!submittable}
        >
          Reply
        </Button>
      </div>
    </form>
  );
}

export default AddCommentBox;
