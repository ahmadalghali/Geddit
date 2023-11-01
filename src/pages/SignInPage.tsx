import { signIn } from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserSignInRequestDTO } from "@/types/dtos";
import { Avatar, Button, PasswordInput, TextInput } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBrandReddit } from "@tabler/icons-react";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
type Inputs = {
  username: string;
  password: string;
};

const clientId = "870485872584-5sgtcd4i1rcnq5uc0a7mq15arq14u55a.apps.googleusercontent.com";

function SignInPage() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();
  const { storeDetails } = useAuthContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ username, password }) => {
    setIsSubmitting(true);

    const usernameTrimmed = username.trim();
    const passwordTrimmed = password.trim();

    if (usernameTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    const userSignInRequestDTO: UserSignInRequestDTO = {
      username: usernameTrimmed,
      password: passwordTrimmed,
    };

    try {
      const user = await signIn(userSignInRequestDTO);
      if (user) {
        storeDetails(user);
        notifications.show({
          color: "green",
          title: `Welcome, ${user.username}`,
          message: "",
        });

        navigate("/");
      } else {
        notifications.show({
          message: "Something went wrong, please try again.",
          color: "red",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className='grid place-items-center pb-5'>
        <Avatar size='xl' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"60"} color='orange' />
        </Avatar>
        <p className='font-extrabold text-3xl text-gray-600 mt-5'>Sign in</p>

        <form onSubmit={handleSubmit(onSubmit)} className='mt-10 w-80'>
          <TextInput placeholder='Username' type='text' {...register("username", { required: true })} />
          <PasswordInput className='my-5' placeholder='Password' {...register("password", { required: true })} />
          <Button
            type='submit'
            w={"100%"}
            radius={"xl"}
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
        <GoogleLogin
          clientId={clientId}
          onSuccess={(response) => console.log("response :>> ", response)}
          onFailure={() => console.log("Failed to sign in")}
          className='mt-20'
        />
      </div>
    </>
  );
}

export default SignInPage;
