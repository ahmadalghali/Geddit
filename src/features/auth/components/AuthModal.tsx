import useSignIn from "@/hooks/useSignIn";
import useSignUp from "@/hooks/useSignUp";
import useTemporaryDemoSignIn from "@/hooks/useTemporaryDemoSignIn";
import { Button, Divider, Modal, PasswordInput, TextInput } from "@mantine/core";
import { ReactNode, useState } from "react";

function AuthModal({ opened = false, close }: { opened: boolean; close: () => void; open?: () => void }) {
  const [displayedModal, setDisplayedModal] = useState<"SIGN_IN" | "SIGN_UP">("SIGN_IN");
  const { signInAsGuest } = useTemporaryDemoSignIn();
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
      styles={{ header: { paddingBottom: 0 } }}
    >
      <div className='grid place-items-center pb-5'>
        {/* <Avatar size='5rem' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"50"} color='orange' />
        </Avatar> */}
        <div>
          {displayedModal == "SIGN_IN" ? (
            <SignInModal onSwitchToSignUp={() => setDisplayedModal("SIGN_UP")} />
          ) : (
            <SignUpModal onSwitchToSignIn={() => setDisplayedModal("SIGN_IN")} />
          )}
          <Divider
            mt={50}
            size={"md"}
            // label='Already have an account?'
            labelPosition='center'
          />

          <p className='mt-10 mb-3 font-bold text-lg text-gray-600'>Just want to look around?</p>

          <GlowingButton onClick={signInAsGuest}>Enter as guest</GlowingButton>
        </div>
      </div>
    </Modal>
  );
}

function GlowingButton({ children, onClick }: { children: ReactNode; onClick: () => void }) {
  return (
    <div className='relative'>
      {/* bg-gradient-to-r from-yellow-600 via-orange-00 to-amber-600 */}
      <div className='absolute -inset-1 bg-amber-600 rounded-3xl blur'></div>
      <Button
        type='submit'
        w={"100%"}
        radius={"xl"}
        color='orange'
        onClick={onClick}
        // @ts-ignore
        sx={{
          fontWeight: "900",
          fontSize: ".9rem",
        }}
        className='uppercase'
      >
        {children}
      </Button>
    </div>
  );
}

function SignInModal({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const { handleSubmit, onSubmit, register, errors } = useSignIn();

  return (
    <div className='w-80'>
      <p className='font-extrabold text-3xl text-center text-gray-600 mt-5'>Sign in to continue</p>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
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

      <p className='mt-10 mb-3 font-bold text-lg text-gray-600'>
        Don't have an account?{" "}
        {/* <span onClick={onSwitchToSignUp} className='underline cursor-pointer hover:'>
          Sign up
        </span> */}
      </p>
      <Button
        type='submit'
        w={"100%"}
        radius={"xl"}
        color='dark'
        variant='outline'
        // @ts-ignore
        sx={{
          fontWeight: "800",
        }}
        onClick={onSwitchToSignUp}
      >
        Sign Up
      </Button>
    </div>
  );
}

function SignUpModal({ onSwitchToSignIn }: { onSwitchToSignIn: () => void }) {
  const { handleSubmit, onSubmit, register, errors } = useSignUp();

  return (
    <div className='w-80'>
      <p className='font-extrabold text-3xl text-center text-gray-600 mt-5'>Sign up to continue</p>
      <form onSubmit={handleSubmit(onSubmit)} className='mt-10'>
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

      <p className='mt-10 mb-3 font-bold text-lg text-gray-600'>
        Already have an account?{" "}
        {/* <span onClick={onSwitchToSignUp} className='underline cursor-pointer hover:'>
          Sign up
        </span> */}
      </p>
      <Button
        type='submit'
        w={"100%"}
        radius={"xl"}
        color='dark'
        variant='outline'
        // @ts-ignore
        sx={{
          fontWeight: "800",
        }}
        onClick={onSwitchToSignIn}
      >
        Sign In
      </Button>
    </div>
  );
}

// const ErrorMessage = ({ children }: { children: ReactNode }) => <p className='h-4'>{children}</p>;

export default AuthModal;
