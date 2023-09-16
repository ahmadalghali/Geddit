import { useDisclosure } from "@mantine/hooks";
import { ReactNode, createContext, useContext } from "react";

type Props = {
  children?: ReactNode;
};

type CommentContextType = {
  optionsModalOpened: boolean;
  closeOptionsModal: () => void;
  openOptionsModal: () => void;
  editDrawerOpened: boolean;
  closeEditDrawer: () => void;
  openEditDrawer: () => void;
};

const initialValue: CommentContextType = {
  optionsModalOpened: false,
  closeOptionsModal: () => {},
  openOptionsModal: () => {},
  editDrawerOpened: false,
  closeEditDrawer: () => {},
  openEditDrawer: () => {},
};

const CommentContext = createContext<CommentContextType>(initialValue);

const CommentProvider = ({ children }: Props) => {
  const [optionsModalOpened, { close: closeOptionsModal, open: openOptionsModal }] = useDisclosure(false);
  const [editDrawerOpened, { close: closeEditDrawer, open: openEditDrawer }] = useDisclosure(false);

  return (
    <CommentContext.Provider
      value={{
        optionsModalOpened,
        closeOptionsModal,
        openOptionsModal,
        editDrawerOpened,
        closeEditDrawer,
        openEditDrawer,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

const useCommentContext = () => useContext(CommentContext);

export { CommentProvider, useCommentContext };
