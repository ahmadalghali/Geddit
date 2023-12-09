import { IconLogin, IconLogout2, IconPencil, IconPlus, IconUser, IconWorld } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Burger } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Constants } from "@/lib/constants";
import { useAuthContext } from "@/contexts/AuthContext";
import { modals } from "@mantine/modals";
import useAuthModal from "@/hooks/useAuthModal";

function NavMenu() {
  const [opened, { toggle, close }] = useDisclosure(false);

  const { clearAuth, isLoggedIn, user } = useAuthContext();
  const navigate = useNavigate();

  const { displayAuthModal } = useAuthModal();

  const displaySignOutModal = () =>
    modals.openConfirmModal({
      title: "Sign out",
      centered: true,
      children: <p>Are you sure you want to sign out?</p>,
      labels: { confirm: "Sign out", cancel: "Cancel" },
      // confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        clearAuth();
        navigate("/");
      },
    });

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

        {isLoggedIn ? (
          <>
            <Link to={`/${Constants.PREFIX_USER}${user?.username}`}>
              <Menu.Item icon={<IconUser />}>Profile</Menu.Item>
            </Link>
            <Menu.Item onClick={displaySignOutModal} icon={<IconLogout2 />}>
              Sign out
            </Menu.Item>
          </>
        ) : (
          <Menu.Item icon={<IconLogin />} onClick={displayAuthModal}>
            Login
          </Menu.Item>
        )}
      </Menu.Dropdown>
    </Menu>
  );
}

export default NavMenu;
