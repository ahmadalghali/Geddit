import { Avatar, Button, PasswordInput, TextInput } from "@mantine/core";
import { useState } from "react";
import { UserRegisterRequestDTO } from "@/types/dtos";
import { register } from "@/api/auth";
import { IconBrandReddit } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

type Inputs = {
  username: string;
  password: string;
};

function RegisterPage() {
  return (
    <>
      <div className='grid place-items-center pb-5'>
        <Avatar size='xl' radius='100%' color='orange'>
          <IconBrandReddit className='text-center' size={"60"} color='orange' />
        </Avatar>
        <p className='font-extrabold text-3xl text-gray-600 mt-5'>Create account</p>
        <form onSubmit={() => {}} className='mt-10 w-80'>
          <TextInput placeholder='Username' type='email' required />
          <PasswordInput className='my-5' placeholder='Password' required />
          <PasswordInput className='my-5' placeholder='Re-type password' required />
          <Button
            type='submit'
            w={"100%"}
            radius={"xl"}
            sx={{
              fontWeight: "800",
            }}
          >
            Create account
          </Button>
        </form>

        <Link to='/sign-in' className='mt-10 font-bold text-gray-600'>
          Don't have an account? <span className='underline cursor-pointer hover:'>Sign in</span>
        </Link>
      </div>
    </>
  );
}

export default RegisterPage;
