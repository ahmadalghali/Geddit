import { API_BASE_URL } from "@/config/api";
import { rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// let notificationId: string;
const updateAxiosCredentials = (loggedIn: boolean) => {
  axiosInstance.defaults.withCredentials = loggedIn;
};

axiosInstance.interceptors.request.use(
  (config) => {
    const authStr = localStorage.getItem("auth");
    if (authStr) {
      const auth = JSON.parse(authStr) as { accessToken: string };
      const token = auth.accessToken;
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    // console.log("config.headers.Authorization :>> ", config.headers.Authorization);
    // console.log("config.withCredentials :>> ", config.withCredentials);

    // return config;
    // Start a timer when the request is sent
    // @ts-ignore
    config.timer = setTimeout(() => {
      notifications.show({
        id: "server-wake-up",
        withBorder: false,
        color: "yellow",
        radius: "md",
        className: "shadow-3xl",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.gray[8],
            // "&::before": { backgroundColor: theme.white },
          },
          title: { color: theme.white, fontSize: "1rem", fontWeight: "600" },
          description: {
            color: theme.white,
            paddingTop: ".25rem",
            paddingBottom: ".25rem",
            fontSize: ".9rem",
            fontWeight: "500",
          },
        }),
        title: "Hang in there! Our servers are starting up.",
        message: "Estimated time left: 10 seconds",
        loading: true,
        autoClose: false,
        withCloseButton: false,
      });
    }, 3000); // Show notification after 4 seconds
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const isSuccessResponse = response.status == 200 || response.status == 201;
    // @ts-ignore
    const serverWakeUpTimer = response.config.timer;

    if (isSuccessResponse && serverWakeUpTimer) {
      notifications.update({
        id: "server-wake-up",
        title: "Server is up and running.",
        message: "You're ready to go!",
        icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
        loading: false,
        autoClose: 2000,
        color: "green",
        withBorder: false,
        radius: "md",
        className: "shadow-3xl",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.gray[8],
            // "&::before": { backgroundColor: theme.white },
          },
          title: { color: theme.white, fontSize: "1rem", fontWeight: "600" },
          description: {
            color: theme.white,
            paddingTop: ".25rem",
            paddingBottom: ".25rem",
            fontSize: ".9rem",
            fontWeight: "500",
          },
        }),
      });
      clearTimeout(serverWakeUpTimer); // Clear the timer
    } else {
      notifications.hide("server-wake-up");
      clearTimeout(serverWakeUpTimer); // Clear the timer
    }
    return response;
  },
  (error) => {
    notifications.hide("server-wake-up");
    clearTimeout(error.response.config.timer); // Clear the timer
    if (error.response) {
      if (error.response.config.timer) {
        notifications.hide("server-wake-up");
        clearTimeout(error.response.config.timer); // Clear the timer
      }
      // The request was made, but the server responded with an error status code
      if (error.response.status === 403) {
        // notifications.show({
        //   title: "Please sign in",
        //   message: "You need to login or create an account",
        //   color: "red",
        // });
        // window.location.href = "/sign-in";
        // Handle the 403 response here, e.g., display an error message or redirect the user
        // console.error("Access denied. You do not have permission to access this resource.");
      } else {
        console.error("Server Error:", error.response.data);
        notifications.show({
          title: error.response.data.message,
          message: "",
          color: "red",
          withCloseButton: false,
        });
      }
      // You can also add additional error handling logic here for other status codes
    } else if (error.request) {
      // The request was made, but no response was received
      // console.error("Network Error:", error.request);
      // notifications.show({
      //   title: "Server error",
      //   message: "It's us, not you, we're working on fixing it :)",
      //   color: "red",
      // });
    } else {
      // Something else happened that caused an error
      // console.error("Error:", error.message);
      // notifications.show({ title: "Something went wrong", message: error.message, color: "red" });
    }

    // You can also throw the error to propagate it to the calling code,
    // so the error handling can be done there as well.
    throw error;
  }
);

// const axiosPrivate = axios.create({
//   baseURL: API_BASE_URL,
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });

export { axiosInstance as api, updateAxiosCredentials };
