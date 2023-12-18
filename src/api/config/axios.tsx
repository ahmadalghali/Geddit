import { API_BASE_URL } from "@/config/api";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// let notificationId: string;

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

    console.log("config.headers.Authorization :>> ", config.headers.Authorization);
    console.log("config.withCredentials :>> ", config.withCredentials);

    return config;
    // Start a timer when the request is sent
    // @ts-ignore
    // config.timer = setTimeout(() => {
    //   notifications.show({
    //     id: "server-wake-up",
    //     withBorder: true,
    //     color: "yellow",
    //     radius: "md",
    //     className: "shadow-3xl",
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     styles: (theme) => ({
    //       root: {
    //         backgroundColor: theme.colors.gray[8],
    //         // "&::before": { backgroundColor: theme.white },
    //       },
    //       title: { color: theme.white, fontSize: "1rem", fontWeight: "600" },
    //       description: {
    //         color: theme.white,
    //         paddingTop: ".25rem",
    //         paddingBottom: ".25rem",
    //         fontSize: ".9rem",
    //         fontWeight: "500",
    //       },
    //     }),
    //     title: "Our server is starting up. ",
    //     message: "Estimated time left: about 10 seconds",
    //     loading: true,
    //     autoClose: false,
    //     withCloseButton: false,
    //   });
    // }, 2500); // Show notification after 3 seconds
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // if (response.config.timer) {
    //   console.log("response.config.timer :>> ", response.config.timer);
    //   notifications.update({
    //     id: "server-wake-up",
    //     title: "Server is up and running.",
    //     message: "You're ready to go!",
    //     icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
    //     loading: false,
    //     autoClose: 3000,
    //     color: "green",
    //     withBorder: true,
    //     radius: "md",
    //     className: "shadow-3xl",
    //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //     // @ts-ignore
    //     styles: (theme) => ({
    //       root: {
    //         backgroundColor: theme.colors.gray[8],
    //         // "&::before": { backgroundColor: theme.white },
    //       },
    //       title: { color: theme.white, fontSize: "1rem", fontWeight: "600" },
    //       description: {
    //         color: theme.white,
    //         paddingTop: ".25rem",
    //         paddingBottom: ".25rem",
    //         fontSize: ".9rem",
    //         fontWeight: "500",
    //       },
    //     }),
    //   });
    //   clearTimeout(response.config.timer); // Clear the timer
    // }
    return response;
  },
  (error) => {
    if (error.response) {
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
        // console.error("Server Error:", error.response.data);
        // notifications.show({
        //   title: "Something went wrong",
        //   message: "Please try again later.",
        //   color: "red",
        // });
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

export { axiosInstance as api };
