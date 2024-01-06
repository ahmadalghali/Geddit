import { UserDTO } from "@/types/dtos";
import { useState } from "react";

function useLoggedInUser() {
  const [user, setUser] = useState<UserDTO | null>();

  return {
    user,
    setUser,
  };
}

export default useLoggedInUser;
