import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <p>Hello, World</p>
    </MantineProvider>
  );
}

export default App;
