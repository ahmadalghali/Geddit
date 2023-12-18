import { signUp } from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import useAuthModal from "@/hooks/useAuthModal";
import { UserRegisterRequestDTO } from "@/types/dtos";
import { notifications } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

function useSignUp() {
  const { setAuth } = useAuthContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Inputs>();
  const { hideAuthModal } = useAuthModal();

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, confirmPassword }) => {
    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    const confirmPasswordTrimmed = confirmPassword.trim();

    if (emailTrimmed.length == 0 || passwordTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    if (passwordTrimmed !== confirmPasswordTrimmed)
      return setError("confirmPassword", { message: "Password does not match" });

    const userSignUpRequestDTO: UserRegisterRequestDTO = {
      email: emailTrimmed,
      password: passwordTrimmed,
    };

    const response = await signUp(userSignUpRequestDTO);
    if (response.status == 200) {
      const accessToken = response.data.accessToken;
      setAuth({ accessToken });

      const { sub: userEmail } = jwtDecode(accessToken);

      notifications.show({
        color: "green",
        title: `Welcome, ${userEmail}`,
        message: "",
      });

      hideAuthModal();
    } else {
      notifications.show({
        message: `Something went wrong, please try again. ${response.status}`,
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

export default useSignUp;
