import { api } from "@/api/config/axios";

function useApi() {
  const setUsernameHeader = (username: string) => {
    api.defaults.headers.username = username;
  };

  const removeUsernameHeader = () => {
    api.defaults.headers.username = null;
  };

  return {
    api,
    setUsernameHeader,
    removeUsernameHeader,
  };
}

export default useApi;
