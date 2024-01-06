import { signIn } from "@/api/auth";
import { updateAxiosCredentials } from "@/api/config/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import useAuthModal from "@/hooks/useAuthModal";
import { UserSignInRequestDTO } from "@/types/dtos";
import { notifications } from "@mantine/notifications";
import axios from "axios";
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
    setError,
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (emailTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    const userSignInRequestDTO: UserSignInRequestDTO = {
      email: emailTrimmed,
      password: passwordTrimmed,
    };

    try {
      const response = await signIn(userSignInRequestDTO);

      if (response.status == 200) {
        const accessToken = response.data.accessToken;
        setAuth({ accessToken });
        updateAxiosCredentials(true);

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
          message: "Oops... something went wrong",
          color: "red",
        });
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 400) {
          setError("email", { message: "Email not found, please register." }, { shouldFocus: true });
        }
      } else {
        // stock error
      }
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
