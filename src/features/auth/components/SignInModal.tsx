import { Avatar, Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconBrandReddit } from "@tabler/icons-react";

function SignInModal() {
  const [signInModalOpened, { close: closeSignInModal }] = useDisclosure(true);

  return (
    <Modal
      centered
      onClose={closeSignInModal}
      opened={signInModalOpened}
      radius={"lg"}
      closeButtonProps={{ size: "xl", color: "gray", radius: "100%" }}
    >
      <div className='grid place-items-center pb-5'>
        <Avatar size='xl' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"60"} color='orange' />
        </Avatar>
        <p className='font-extrabold text-3xl text-gray-600 mt-5'>Sign in to continue</p>
        <form onSubmit={() => {}} className='mt-10 w-80'>
          <TextInput placeholder='Username' type='email' required />
          <PasswordInput className='my-5' placeholder='Password' required />
          <Button
            type='submit'
            w={"100%"}
            radius={"xl"}
            // @ts-ignore
            sx={{
              fontWeight: "800",
            }}
          >
            Sign in
          </Button>
        </form>

        <p className='mt-10 font-bold text-gray-600'>
          Don't have an account? <span className='underline cursor-pointer hover:'>Register</span>
        </p>
      </div>
    </Modal>
  );
}

export default SignInModal;
