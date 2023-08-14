import { MantineProvider, createEmotionCache } from "@mantine/core";

import { RouterProvider } from "react-router-dom";
import router from "./Router";
import { Notifications } from "@mantine/notifications";

const cache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

function App() {
  return (
    <MantineProvider emotionCache={cache} withGlobalStyles withNormalizeCSS>
      <Notifications autoClose={4000} className='rounded-md' />
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
