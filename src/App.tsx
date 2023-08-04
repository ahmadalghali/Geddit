import { MantineProvider, createEmotionCache } from "@mantine/core";

import { RouterProvider } from "react-router-dom";
import router from "./Router";

const cache = createEmotionCache({
  key: "mantine",
  prepend: false,
});

function App() {
  return (
    <MantineProvider emotionCache={cache} withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
