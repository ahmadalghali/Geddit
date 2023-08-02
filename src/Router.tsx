import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./layouts/RootLayout";
import SearchPage from "./pages/SearchResultsPage";
import Constants from "./constants";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";

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
        path: `/${Constants.PREFIX_COMMUNITY}:communityName`,
        element: <CommunityPage />,
  
      },
      {
        path: "/create-post",
        element: <CreatePostPage />,
      },
      {
        path: "/create-community",
        element: <CreateCommunityPage />,
      },
    ],
  },
]);

export default router;
