import { UserDTO } from "@/types/dtos";
import { useState } from "react";

function useLoggedInUser() {
  const [user, setUser] = useState<UserDTO | null>({ id: "123", username: "ahmad" });

  return {
    user,
    setUser,
  };
}

export default useLoggedInUser;
