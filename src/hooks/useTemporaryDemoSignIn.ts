import { temporaryDemoSignIn } from "@/api/auth";
import { updateAxiosCredentials } from "@/api/config/axios";
import { useAuthContext } from "@/contexts/AuthContext";
import useAuthModal from "@/hooks/useAuthModal";
import { notifications } from "@mantine/notifications";
import { jwtDecode } from "jwt-decode";

function useTemporaryDemoSignIn() {
  const { setAuth } = useAuthContext();
  const { hideAuthModal } = useAuthModal();

  const signInAsGuest = async () => {
    try {
      const response = await temporaryDemoSignIn();

      if (response.status == 200) {
        const accessToken = response.data.accessToken;
        updateAxiosCredentials(true);
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
          message: "Oops... something went wrong",
          color: "red",
        });
      }
    } catch (err) {
      notifications.show({
        message: "Oops... something went wrong",
        color: "red",
      });
    }
  };
  return {
    signInAsGuest,
  };
}

export default useTemporaryDemoSignIn;
