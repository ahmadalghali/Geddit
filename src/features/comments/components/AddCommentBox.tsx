import { Button, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { CreateCommentDTO } from "@/types/dtos";
import { cn } from "@/lib/utils/classname";

function AddCommentBox({
  onSubmit,
  className,
  text = "",
  onChange,
}: {
  className?: string;
  onSubmit: (createCommentDTO: CreateCommentDTO) => void;
  text: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement> | undefined;
}) {
  const [submittable, setSubmittable] = useState(false);

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
  };

  return (
    <form onSubmit={handleSubmit} className={cn("border-2 border-gray-200 rounded-md", className)}>
      <Textarea
        placeholder='Add a comment'
        minRows={3}
        radius={"md"}
        value={text}
        onChange={onChange}
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
