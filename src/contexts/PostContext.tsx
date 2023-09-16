import usePost from "@/hooks/usePost";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

type Props = {
  children?: ReactNode;
};

type PostContextType = {};

// const initialValue: PostContextType = {};

const PostContext = createContext<PostContextType | null>(null);

const PostProvider = ({ children }: Props) => {
  const { removeComment } = usePost();
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
