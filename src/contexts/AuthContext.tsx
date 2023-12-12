import { UserDTO } from "@/types/dtos";
import { ReactNode, createContext, useContext } from "react";
import { useLocalStorage } from "react-use";
import { jwtDecode } from "jwt-decode";
type AuthContextType = {
  auth: { accessToken: string } | undefined;
  setAuth: React.Dispatch<
    React.SetStateAction<
      | {
          accessToken: string;
        }
      | undefined
    >
  >;
  // user: UserDTO | undefined;
  // setUser: React.Dispatch<React.SetStateAction<UserDTO | undefined>>;
  isLoggedIn: boolean;
  // storeDetails: (user: UserDTO) => void;
  clearAuth: () => void;
  user: UserDTO | undefined;
};

const AuthContext = createContext<AuthContextType | null>({
  auth: undefined,
  setAuth: () => {},
  isLoggedIn: false,
  // setUser: () => {},
  // user: undefined,
  // storeDetails: () => {},
  clearAuth: () => {},
  user: undefined,
});

function AuthProvider({ children }: { children: ReactNode }) {
  // const [user, setUser] = useState<UserDTO | null>(null);
  // const [auth, setAuth] = useState<{ accessToken: string }>();
  // const [user, setUser, clearUser] = useLocalStorage<UserDTO>("user", undefined);
  const [auth, setAuth, clearAuth] = useLocalStorage<{ accessToken: string }>("auth", undefined);
  let userId;
  let userEmail;
  let user: UserDTO | undefined;
  if (auth?.accessToken) {
    const decodedToken = jwtDecode(auth.accessToken) as { userId: string; sub: string; exp: string };
    userId = decodedToken.userId;
    userEmail = decodedToken.sub;
    user = { id: userId, username: userEmail };
  }
  const isLoggedIn = !!auth;

  return <AuthContext.Provider value={{ auth, setAuth, isLoggedIn, clearAuth, user }}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuthContext, AuthContext };
