import { signUp } from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import { UserRegisterRequestDTO, UserSignInRequestDTO } from "@/types/dtos";
import { notifications } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";
// import { useLocation, useNavigate } from "react-router-dom";

type Inputs = {
  email: string;
  password: string;
  confirmPassword: string;
};

function useSignUp() {
  const { setAuth, user } = useAuthContext();

  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  //  const [, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password, confirmPassword }) => {
    //  setIsSubmitting(true);

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();
    const confirmPasswordTrimmed = confirmPassword.trim();

    if (emailTrimmed.length == 0 || passwordTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    if (passwordTrimmed !== confirmPasswordTrimmed) return;

    const userSignUpRequestDTO: UserRegisterRequestDTO = {
      email: emailTrimmed,
      password: passwordTrimmed,
    };

    try {
      const response = await signUp(userSignUpRequestDTO);
      console.log("response :>> ", response);
      if (response.accessToken) {
        const accessToken = response.accessToken;
        setAuth({ accessToken });

        // navigate(from, { replace: true });
        // storeDetails(user);
        //

        notifications.show({
          color: "green",
          title: `Welcome, ${user?.username}`,
          message: "",
        });

        // navigate("/");
      } else {
        notifications.show({
          message: "Something went wrong, please try again.",
          color: "red",
        });
      }
    } finally {
      //  setIsSubmitting(false);
    }
  };
  return {
    handleSubmit,
    onSubmit,
    register,
  };
}

export default useSignUp;
