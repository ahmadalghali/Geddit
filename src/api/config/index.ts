import { API_BASE_URL } from "@/config/api";
import { notifications } from "@mantine/notifications";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    username: "ahmad",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made, but the server responded with an error status code
      console.error("Server Error:", error.response.data);
      notifications.show({
        title: "Something went wrong",
        message: "Please try again later.",
        color: "red",
      });
    } else if (error.request) {
      // The request was made, but no response was received
      console.error("Network Error:", error.request);
      notifications.show({
        title: "Server error",
        message: "It's us, not you, we're working on fixing it :)",
        color: "red",
      });
    } else {
      // Something else happened that caused an error
      console.error("Error:", error.message);
      notifications.show({ title: "Something went wrong", message: error.message, color: "red" });
    }

    // You can also throw the error to propagate it to the calling code,
    // so the error handling can be done there as well.
    throw error;
  }
);
export { axiosInstance as api };
