import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./layouts/RootLayout";
import SearchPage from "./pages/SearchResultsPage";
import Constants from "./constants";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },
      {
        path: `/${Constants.PREFIX_COMMUNITY}:community`,
        element: <CommunityPage />, // COMMUNITY PAGE HERE
      },
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
      {
        path: "/create-community",
        element: <CreateCommunityPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
]);

export default router;
