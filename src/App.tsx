import { MantineProvider } from "@mantine/core";
import Header from "./components/Header";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Header />
    </MantineProvider>
  );
}

export default App;
