import SearchBar from "@/components/SearchBar";
import { IconPencil, IconPlus, IconUser, IconWorld } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <div className='bg-amber-500 flex items-center justify-between px-5 py-3 fixed  top-0 left-0 right-0 z-50 shadow-md'>
      <div onClick={() => navigate("/")} className='cursor-pointer'>
        <Logo />
      </div>
      <Link to={`/explore`}>
        <IconWorld size={30} className='cursor-pointer text-amber-900' />
      </Link>

      <SearchBar />
      <Link to={`/create-community`}>
        <IconPlus size={30} className='cursor-pointer text-amber-900' />
      </Link>
      <Link to={`/create-post`}>
        <IconPencil size={30} className='cursor-pointer text-amber-900' />
      </Link>

      <Link to={`/register`}>
        <IconUser className='cursor-pointer text-amber-900' size={30} />
      </Link>
    </div>
  );
}

function Logo() {
  return <p className='font-black text-2xl text-amber-900'>Gedit</p>;
}
export default Header;
