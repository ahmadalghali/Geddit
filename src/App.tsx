import { MantineProvider, createEmotionCache } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { AuthProvider } from "@/contexts/AuthContext";
import AuthModal from "@/features/auth/components/AuthModal";
import useAuthModal from "@/hooks/useAuthModal";
import { api } from "@/api/config/axios";

// import { gapi } from "gapi-script";

const cache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

// const clientId = "870485872584-5sgtcd4i1rcnq5uc0a7mq15arq14u55a.apps.googleusercontent.com";

function App() {
  const { hideAuthModal, opened_authModal, displayAuthModal } = useAuthModal();

  api.interceptors.response.use(
    (val) => val,
    (error) => {
      if (error.response.status == 403) {
        displayAuthModal();
      }

      return Promise.reject(error);
    }
  );

  return (
    <MantineProvider emotionCache={cache} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Notifications transitionDuration={400} autoClose={2500} position='bottom-center' />
        <AuthProvider>
          <RouterProvider router={router} />
          <AuthModal opened={opened_authModal} close={hideAuthModal} />
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
