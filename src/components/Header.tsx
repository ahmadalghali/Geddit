import { IconPencil, IconPlus, IconUser, IconWorld } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Menu, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import useLoggedInUser from "@/hooks/useLoggedInUser";
import { Constants } from "@/lib/constants";
import SearchBar from "@/features/search/components/SearchBar";

function Header() {
  return (
    <div className='bg-amber-500 fixed inset-x-0 z-50 shadow-md'>
      <div className='flex items-center py-3 sm:px-10 px-5 justify-between space-x-5 mx-auto  max-w-3xl'>
        <Link to='/' className='cursor-pointer'>
          <Logo />
        </Link>

        <SearchBar />
        <NavMenu />
      </div>
    </div>
  );
}

function NavMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { user } = useLoggedInUser();

  return (
    <Menu
      closeOnClickOutside
      closeOnItemClick
      onClose={close}
      opened={opened}
      position={"bottom-end"}
      shadow='md'
      width={"300"}
      classNames={{ itemLabel: "text-base font-semibold" }}
    >
      <Menu.Target>
        <Burger opened={opened} onClick={toggle} />
      </Menu.Target>

      <Menu.Dropdown>
        <Link to={`/explore`}>
          <Menu.Item icon={<IconWorld />}>Explore</Menu.Item>
        </Link>
        <Link to={`/create-post`}>
          <Menu.Item icon={<IconPencil />}>Create Post</Menu.Item>
        </Link>
        <Link to={`/create-community`}>
          <Menu.Item icon={<IconPlus />}>Create Community</Menu.Item>
        </Link>
        <Link to={`${Constants.PREFIX_USER}${user?.username}`}>
          <Menu.Item icon={<IconUser />}>Profile</Menu.Item>
        </Link>
      </Menu.Dropdown>
    </Menu>
  );
}
function Logo() {
  return <p className='font-black text-2xl text-amber-900'>Geddit</p>;
}
export default Header;
