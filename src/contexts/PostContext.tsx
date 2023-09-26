import usePost from "@/hooks/usePost";
import { ReactNode, createContext, useContext } from "react";
import { useParams } from "react-router-dom";

type Props = {
  children?: ReactNode;
};

type PostContextType = ReturnType<typeof usePost>;

const PostContext = createContext<PostContextType | null>(null);

const PostProvider = ({ children }: Props) => {
  const { postId } = useParams();

  return <PostContext.Provider value={usePost(postId!)}>{children}</PostContext.Provider>;
};

function usePostContext() {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error("usePostContext must be used within a PostProvider");
  }

  return context;
}

export { PostContext, PostProvider, usePostContext };
