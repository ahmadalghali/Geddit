import useSignIn from "@/hooks/useSignIn";
import { Avatar, Button, PasswordInput, TextInput } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";

import { Link } from "react-router-dom";
// import { useSignIn } from "react-auth-kit";
// import { GoogleLogin } from "react-google-login";

// const clientId = "870485872584-5sgtcd4i1rcnq5uc0a7mq15arq14u55a.apps.googleusercontent.com";

function SignInPage() {
  const { register, onSubmit, handleSubmit } = useSignIn();

  return (
    <>
      <div className='grid place-items-center pb-5'>
        <Avatar size='xl' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"60"} color='orange' />
        </Avatar>
        <p className='font-extrabold text-3xl text-gray-600 mt-5'>Sign in</p>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-10 w-80'>
          <TextInput
            placeholder='Email'
            type='text'
            {...register("email", { required: true, value: "ahmad1@gmail.com" })}
          />
          <PasswordInput
            className='my-5'
            placeholder='Password'
            {...register("password", { required: true, value: "password123" })}
          />
          <Button
            type='submit'
            w={"100%"}
            radius={"xl"}
            //@ts-ignore
            sx={{
              fontWeight: "800",
            }}
          >
            Sign in
          </Button>
        </form>

        <Link to='/register' className='mt-10 font-bold text-gray-600'>
          Don't have an account? <span className='underline cursor-pointer hover:'>Register</span>
        </Link>
        {/* <GoogleLogin
          clientId={clientId}
          onSuccess={(response) => console.log("response :>> ", response)}
          onFailure={() => console.log("Failed to sign in")}
          className='mt-20'
        /> */}
      </div>
    </>
  );
}

export default SignInPage;
