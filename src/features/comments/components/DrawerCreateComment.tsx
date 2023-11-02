import { Button, CloseButton, Drawer, MantineNumberSize, Textarea } from "@mantine/core";
import { useState } from "react";

type Props = {
  onSubmit: (text: string) => void;
  close: () => void;
  opened: boolean;
  size?: MantineNumberSize | undefined;
};

function DrawerCreateComment({ close, opened, onSubmit, size = "40%" }: Props) {
  const [text, setText] = useState("");

  const handleSubmit = (text: string) => {
    onSubmit(text);
    handleClose();
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setText("");
    }, 1000);
  };
  const onCancel = () => handleClose();

  return (
    <Drawer.Root
      classNames={{ body: "max-w-3xl mx-auto" }}
      onClose={onCancel}
      opened={opened}
      position='bottom'
      size={size}
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header>
          <CloseButton onClick={onCancel} size={"xl"} iconSize={25} radius={"xl"} color='gray' />
          {/* @ts-ignore */}
          <Drawer.Title sx={{ fontWeight: "600", fontSize: "1.2rem" }} className='text-gray-500'>
            Reply to comment
          </Drawer.Title>
          <Button
            onClick={() => {
              handleSubmit(text);
              close();
            }}
          >
            SEND
          </Button>
        </Drawer.Header>
        <Drawer.Body>
          <hr className='mt-4 ' />

          <Textarea
            styles={{
              input: { border: "none", outline: "", fontSize: "1rem", padding: 0, height: "100%", width: "100%" },
            }}
            placeholder='Enter text...'
            minRows={20}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export default DrawerCreateComment;
