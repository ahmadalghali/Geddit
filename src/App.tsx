import Header from "./components/Header";
import CreateCommunityForm from "./components/CreateCommunityForm";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Header />
        <div className="m-5">
          <CreateCommunityForm />
        </div>
      </MantineProvider>
    </>
  );
}

export default App;
