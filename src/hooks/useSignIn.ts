import { signIn } from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import useAuthModal from "@/hooks/useAuthModal";
import { UserSignInRequestDTO } from "@/types/dtos";
import { notifications } from "@mantine/notifications";
import { jwtDecode } from "jwt-decode";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

function useSignIn() {
  const { setAuth } = useAuthContext();
  const { hideAuthModal } = useAuthModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (emailTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    const userSignInRequestDTO: UserSignInRequestDTO = {
      email: emailTrimmed,
      password: passwordTrimmed,
    };

    const response = await signIn(userSignInRequestDTO);

    if (response.status == 200) {
      const accessToken = response.data.accessToken;
      setAuth({ accessToken });

      const { sub: userEmail } = jwtDecode(accessToken);

      notifications.show({
        color: "green",
        title: `Welcome, ${userEmail}`,
        message: "",
      });

      // notifications.show({
      //   color: "green",
      //   title: `Welcome, ${user?.username}`,
      //   message: "",
      // });

      hideAuthModal();
    } else {
      notifications.show({
        message: "Something went wrong, please try again.",
        color: "red",
      });
    }
  };
  return {
    handleSubmit,
    onSubmit,
    register,
    errors,
  };
}

export default useSignIn;
