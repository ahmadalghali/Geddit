import { Avatar, Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandReddit } from "@tabler/icons-react";

function SignOutModal() {
  const [signOutModalOpened, { open: openSignOutModal, close: closeSignOutModal }] = useDisclosure(true);

  return (
    <Modal
      centered
      onClose={closeSignOutModal}
      opened={signOutModalOpened}
      radius={"lg"}
      closeButtonProps={{ size: "xl", color: "gray", radius: "100%" }}
    >
      <div className='grid place-items-center pb-5'>
        <Avatar size='xl' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"60"} color='orange' />
        </Avatar>
        <p className='font-extrabold text-3xl text-gray-600 mt-5'>Sign out to continue</p>
        <Button
          type='submit'
          w={"100%"}
          radius={"xl"}
          sx={{
            fontWeight: "800",
          }}
        >
          Sign out
        </Button>
      </div>
    </Modal>
  );
}

export default SignOutModal;
