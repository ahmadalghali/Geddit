import { Button } from "@mantine/core";
import SearchBar from "./SearchBar";

function Header() {
  return (
    <div className="bg-yellow-300 p-2">
      <SearchBar />
      <Button>Create Community</Button>
    </div>
  );
}

export default Header;
