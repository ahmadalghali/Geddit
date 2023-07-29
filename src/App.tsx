import { MantineProvider } from "@mantine/core";
import { RouterProvider } from "react-router-dom";
import router from "./Router";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <RouterProvider router={router} />
    </MantineProvider>
  );
}

export default App;
