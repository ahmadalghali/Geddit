import useSignIn from "@/hooks/useSignIn";
import useSignUp from "@/hooks/useSignUp";
import { Avatar, Button, Modal, PasswordInput, TextInput } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { useState } from "react";

function AuthModal({ opened = false, close }: { opened: boolean; close: () => void; open?: () => void }) {
  const [displayedModal, setDisplayedModal] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  // const [signInModalDisplayed, setSignInModalDisplayed] = useState(true);
  // {displayedModal == "SIGN_IN" ? <SignInModal onSwitchToSignUp={() => setDisplayedModal("SIGN_UP")}/> : <SignUpModal onSwitchToSignIn={() => setDisplayedModal("SIGN_IN")}/>}
  // const toggleModal = () => {
  //   setDisplayedModal((prev) => (prev == "SIGN_IN" ? "SIGN_UP" : "SIGN_IN"));
  // };

  return (
    <Modal
      centered
      onClose={close}
      opened={opened}
      radius={"lg"}
      closeButtonProps={{ size: "xl", color: "gray", radius: "100%" }}
    >
      <div className='grid place-items-center pb-5'>
        <Avatar size='xl' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"60"} color='orange' />
        </Avatar>
        {displayedModal == "SIGN_IN" ? (
          <SignInModal onSwitchToSignUp={() => setDisplayedModal("SIGN_UP")} />
        ) : (
          <SignUpModal onSwitchToSignIn={() => setDisplayedModal("SIGN_IN")} />
        )}
      </div>
    </Modal>
  );
}

function SignInModal({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const { handleSubmit, onSubmit, register, errors } = useSignIn();

  return (
    <>
      <p className='font-extrabold text-3xl text-gray-600 mt-5'>Sign in to continue</p>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-10 w-80'>
        <TextInput
          label='Email'
          withAsterisk
          error={errors.email && errors.email.message}
          placeholder='Email'
          type='email'
          {...register("email", { required: true })}
        />

        <PasswordInput
          className='my-5'
          withAsterisk
          label='Password'
          placeholder='Password'
          error={errors.password && errors.password.message}
          {...register("password", { required: true })}
        />
        <PasswordInput className='my-5 invisible' label='NEEDED FOR ' />
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
        Don't have an account?{" "}
        <span onClick={onSwitchToSignUp} className='underline cursor-pointer hover:'>
          Sign up
        </span>
      </p>
    </>
  );
}

function SignUpModal({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const { handleSubmit, onSubmit, register, errors } = useSignUp();

  return (
    <>
      <p className='font-extrabold text-3xl text-gray-600 mt-5'>Sign up to continue</p>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-10 w-80'>
        <TextInput
          label='Email'
          withAsterisk
          error={errors.email && errors.email.message}
          placeholder='Email'
          type='email'
          {...register("email", { required: true })}
        />

        <PasswordInput
          className='my-5'
          withAsterisk
          label='Password'
          placeholder='Password'
          error={errors.password && errors.password.message}
          {...register("password", { required: true })}
        />

        <PasswordInput
          className='my-5'
          withAsterisk
          label='Confirm password'
          placeholder='Confirm Password'
          error={errors.confirmPassword && errors.confirmPassword.message}
          {...register("confirmPassword", { required: true })}
        />
        <Button
          type='submit'
          w={"100%"}
          radius={"xl"}
          // @ts-ignore
          sx={{
            fontWeight: "800",
          }}
        >
          Sign up
        </Button>
      </form>

      <p className='mt-10 font-bold text-gray-600'>
        Already have an account?{" "}
        <span onClick={onSwitchToSignIn} className='underline cursor-pointer'>
          Sign in
        </span>
      </p>
    </>
  );
}

// const ErrorMessage = ({ children }: { children: ReactNode }) => <p className='h-4'>{children}</p>;

export default AuthModal;
