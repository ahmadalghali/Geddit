import { Button, CloseButton, Drawer, MantineNumberSize, Textarea } from "@mantine/core";
import { useState } from "react";

type Props = {
  onSave: (text: string) => void;
  text: string | undefined;
  close: () => void;
  opened: boolean;
  resource: "comment" | "post";
  title?: string;
  size?: MantineNumberSize | undefined;
};

function DrawerEditText({ close, opened, text = "", title, onSave, resource, size = "90%" }: Props) {
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleSave = (updatedPostBody: string) => {
    onSave(updatedPostBody);
    close();
  };

  const onCancel = () => {
    close();
    setTimeout(() => {
      setUpdatedText(text);
    }, 1000);
  };

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
          <Drawer.Title sx={{ fontWeight: "600", fontSize: "1.2rem" }} className='text-gray-500'>
            Edit {resource}
          </Drawer.Title>
          <Button
            onClick={() => {
              handleSave(updatedText);
              close();
            }}
          >
            SAVE
          </Button>
        </Drawer.Header>
        <Drawer.Body>
          <p className='font-bold text-2xl'>{title}</p>
          <hr className='mt-4 ' />

          <Textarea
            styles={{
              input: { border: "none", outline: "", fontSize: "1rem", padding: 0, height: "100%", width: "100%" },
            }}
            placeholder='Enter text...'
            minRows={20}
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export default DrawerEditText;
