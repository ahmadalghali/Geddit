import { Button, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { CreateCommentDTO } from "@/types/dtos";
import { cn } from "@/lib/utils/classname";

function AddCommentBox({
  onSubmit,
  className,
}: {
  className?: string;
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
    <form onSubmit={handleSubmit} className={cn("border-2 border-gray-200 rounded-md", className)}>
      <Textarea
        placeholder='Add a comment'
        minRows={3}
        radius={"md"}
        value={text}
        onChange={(e) => setText(e.target.value)}
        styles={{ input: { border: "none" } }}
      />
      <div className='flex justify-end py-2 px-2'>
        <Button
          type='submit'
          radius={"xl"}
          // sx={{
          //   fontWeight: "bold",
          //   color: "white",
          //   ":disabled": { background: "darkgray", color: "rgb(239, 239, 239)" },
          // }}
          className='ml-auto transition-all duration-300'
          disabled={!submittable}
        >
          Reply
        </Button>
      </div>
    </form>
  );
}

export default AddCommentBox;
