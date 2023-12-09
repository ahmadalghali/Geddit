import { signIn } from "@/api/auth";
import { useAuthContext } from "@/contexts/AuthContext";
import useAuthModal from "@/hooks/useAuthModal";
import { UserSignInRequestDTO } from "@/types/dtos";
import { notifications } from "@mantine/notifications";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  email: string;
  password: string;
};

function useSignIn() {
  const { setAuth, user } = useAuthContext();
  const { hideAuthModal } = useAuthModal();

  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";

  // const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  //  const [, setIsSubmitting] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = async ({ email, password }) => {
    //  setIsSubmitting(true);

    const emailTrimmed = email.trim();
    const passwordTrimmed = password.trim();

    if (emailTrimmed.length == 0 || passwordTrimmed.length == 0) return;

    const userSignInRequestDTO: UserSignInRequestDTO = {
      email: emailTrimmed,
      password: passwordTrimmed,
    };

    try {
      const response = await signIn(userSignInRequestDTO);
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

        hideAuthModal();

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

export default useSignIn;
