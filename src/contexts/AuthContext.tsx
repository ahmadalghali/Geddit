import useApi from "@/hooks/useApi";
import { UserDTO } from "@/types/dtos";
import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "react-use";

type AuthContextType = {
  user: UserDTO | undefined;
  setUser: React.Dispatch<React.SetStateAction<UserDTO | undefined>>;
  isLoggedIn: boolean;
  storeDetails: (user: UserDTO) => void;
  removeDetails: () => void;
};

const AuthContext = createContext<AuthContextType | null>({
  isLoggedIn: false,
  setUser: () => {},
  user: undefined,
  storeDetails: () => {},
  removeDetails: () => {},
});

function AuthProvider({ children }: { children: ReactNode }) {
  // const [user, setUser] = useState<UserDTO | null>(null);
  const [user, setUser, clearUser] = useLocalStorage<UserDTO>("user", undefined);
  const isLoggedIn = !!user;

  const { setUsernameHeader, removeUsernameHeader } = useApi();

  const storeDetails = (user: UserDTO) => {
    setUser(user);
    setUsernameHeader(user.username);
  };

  const removeDetails = () => {
    clearUser();
    removeUsernameHeader();
  };

  return (
    <AuthContext.Provider value={{ user, setUser, isLoggedIn, storeDetails, removeDetails }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuthContext };
