import { MantineProvider, createEmotionCache } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { AuthProvider } from "@/contexts/AuthContext";
import { useEffect } from "react";
import { gapi } from "gapi-script";

const cache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

const clientId = "870485872584-5sgtcd4i1rcnq5uc0a7mq15arq14u55a.apps.googleusercontent.com";

function App() {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    };

    gapi.load("client:auth2", start);
  }, []);
  return (
    <MantineProvider emotionCache={cache} withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Notifications transitionDuration={400} autoClose={2500} position='bottom-center' />
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
