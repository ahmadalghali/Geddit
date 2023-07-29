import { IconPencil, IconUser } from "@tabler/icons-react";
import SearchBar from "./SearchBar";
import { Avatar } from "@mantine/core";
import { useNavigate } from "react-router-dom";
function Header() {
  const navigate = useNavigate();
  return (
    <div className="bg-amber-500 flex items-center justify-between px-5 py-3">
      <div onClick={() => navigate("/")} className="cursor-pointer">
        <Logo />
      </div>
      <SearchBar />
      <Avatar radius="xl" onClick={() => navigate("/create-post")}>
        <IconPencil />
      </Avatar>
      <Avatar radius="xl">
        <IconUser />
      </Avatar>
    </div>
  );
}

function Logo() {
  return <p className="font-black text-xl">GoGedit</p>;
}
export default Header;
