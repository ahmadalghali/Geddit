import { Link } from "react-router-dom";
import SearchBar from "@/features/search/components/SearchBar";
import NavMenu from "@/components/Header/NavMenu";

function Header() {
  return (
    <>
      {/* <SignInModal /> */}
      <div className='bg-amber-500 fixed inset-x-0 z-50 shadow-md'>
        <div className='flex items-center py-3 sm:px-10 px-5 justify-between space-x-5 mx-auto  max-w-3xl'>
          <Link to='/' className='cursor-pointer'>
            <Logo />
          </Link>

          <SearchBar />

          <NavMenu />
        </div>
      </div>
    </>
  );
}

function Logo() {
  return <p className='font-black text-2xl text-amber-900'>Geddit</p>;
}
export default Header;
