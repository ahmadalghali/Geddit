import usePost from "@/hooks/usePost";
import { ReactNode, createContext, useContext } from "react";

// TODO: utilise this file to clean up post functionality
type Props = {
  children?: ReactNode;
};

type PostContextType = {};

// const initialValue: PostContextType = {};

const PostContext = createContext<PostContextType | null>(null);

const PostProvider = ({ children }: Props) => {
  return <PostContext.Provider value={{}}>{children}</PostContext.Provider>;
};

function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
}

export { PostContext, PostProvider, usePostContext };
