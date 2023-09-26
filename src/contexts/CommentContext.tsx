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
  createCommentDrawerOpened: boolean;
  closeCreateCommentDrawer: () => void;
  openCreateCommentDrawer: () => void;
  toggleCreateCommentDrawer: () => void;
};

const initialValue: CommentContextType = {
  optionsModalOpened: false,
  closeOptionsModal: () => {},
  openOptionsModal: () => {},
  editDrawerOpened: false,
  closeEditDrawer: () => {},
  openEditDrawer: () => {},
  createCommentDrawerOpened: false,
  closeCreateCommentDrawer: () => {},
  openCreateCommentDrawer: () => {},
  toggleCreateCommentDrawer: () => {},
};

const CommentContext = createContext<CommentContextType>(initialValue);

const CommentProvider = ({ children }: Props) => {
  const [optionsModalOpened, { close: closeOptionsModal, open: openOptionsModal }] = useDisclosure(false);
  const [editDrawerOpened, { close: closeEditDrawer, open: openEditDrawer }] = useDisclosure(false);
  const [
    createCommentDrawerOpened,
    { close: closeCreateCommentDrawer, open: openCreateCommentDrawer, toggle: toggleCreateCommentDrawer },
  ] = useDisclosure(false);

  return (
    <CommentContext.Provider
      value={{
        optionsModalOpened,
        closeOptionsModal,
        openOptionsModal,
        editDrawerOpened,
        closeEditDrawer,
        openEditDrawer,
        createCommentDrawerOpened,
        closeCreateCommentDrawer,
        openCreateCommentDrawer,
        toggleCreateCommentDrawer,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

const useCommentContext = () => useContext(CommentContext);

export { CommentProvider, useCommentContext };
