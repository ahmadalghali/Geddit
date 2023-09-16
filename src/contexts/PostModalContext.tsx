import { useDisclosure } from "@mantine/hooks";
import { ReactNode, createContext, useContext } from "react";

type Props = {
  children?: ReactNode;
};

type ModalContextType = {
  postOptionsModalOpened: boolean;
  closePostOptionsModal: () => void;
  openPostOptionsModal: () => void;
  editDrawerOpened: boolean;
  closeEditDrawer: () => void;
  openEditDrawer: () => void;
};

const initialValue: ModalContextType = {
  postOptionsModalOpened: false,
  closePostOptionsModal: () => {},
  openPostOptionsModal: () => {},
  editDrawerOpened: false,
  closeEditDrawer: () => {},
  openEditDrawer: () => {},
};

const PostModalContext = createContext<ModalContextType>(initialValue);

const PostModalProvider = ({ children }: Props) => {
  const [postOptionsModalOpened, { close: closePostOptionsModal, open: openPostOptionsModal }] = useDisclosure(false);
  const [editDrawerOpened, { close: closeEditDrawer, open: openEditDrawer }] = useDisclosure(false);

  return (
    <PostModalContext.Provider
      value={{
        postOptionsModalOpened,
        closePostOptionsModal,
        openPostOptionsModal,
        editDrawerOpened,
        closeEditDrawer,
        openEditDrawer,
      }}
    >
      {children}
    </PostModalContext.Provider>
  );
};

const usePostModalContext = () => useContext(PostModalContext);

export { PostModalProvider, usePostModalContext };
