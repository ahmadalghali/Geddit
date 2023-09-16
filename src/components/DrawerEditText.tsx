import { Button, Drawer, Textarea } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

type Props = {
  onSave: (text: string) => void;
  title: string;
  text: string;
  close: () => void;
  opened: boolean;
  resource: "comment" | "post";
};

function DrawerEditText({ close, opened, text, title, onSave, resource }: Props) {
  const [updatedText, setUpdatedText] = useState<string>(text);

  const handleSave = (updatedPostBody: string) => {
    onSave(updatedPostBody);
    close();
  };
  return (
    <Drawer.Root
      classNames={{ body: "max-w-3xl mx-auto" }}
      onClose={close}
      opened={opened}
      position='bottom'
      size='90%'
    >
      <Drawer.Overlay />
      <Drawer.Content>
        <Drawer.Header className='mr-8 '>
          <div className='flex justify-between items-center w-full px-0 mx-0'>
            <div className=''>
              <Drawer.CloseButton onClick={close}>
                <IconX />
              </Drawer.CloseButton>
            </div>
            <Drawer.Title sx={{ fontWeight: "600", fontSize: "1.2rem" }} className='text-gray-500'>
              Edit {resource}
            </Drawer.Title>
            <div className=''>
              <Drawer.CloseButton onClick={() => handleSave(updatedText)} className='mt-2 '>
                <Button>SAVE</Button>
              </Drawer.CloseButton>
            </div>
          </div>
        </Drawer.Header>
        <Drawer.Body>
          <p className='font-bold text-2xl'>{title}</p>
          <Textarea
            className='mt-5'
            minRows={10}
            value={updatedText}
            onChange={(e) => setUpdatedText(e.target.value)}
          />
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
}

export default DrawerEditText;
