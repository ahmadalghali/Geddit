import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import RootLayout from "./layouts/RootLayout";
import SearchPage from "./pages/SearchResultsPage";
import Constants from "./constants";
import CommunityPage from "./pages/CommunityPage";
import CreatePostPage from "./pages/CreatePostPage";
import CreateCommunityPage from "./pages/CreateCommunityPage";
import RegisterPage from "./pages/RegisterPage";
import PostPage from "./pages/PostPage";
import ExploreCommunitiesPage from "./pages/ExploreCommunitiesPage";
import AnimatedPage from "./components/animate/AnimatedPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <AnimatedPage>
            <LandingPage />
          </AnimatedPage>
        ),
      },
      {
        path: "/explore",
        element: (
          <AnimatedPage>
            <ExploreCommunitiesPage />
          </AnimatedPage>
        ),
      },
      {
        path: "/search",
        element: (
          <AnimatedPage>
            <SearchPage />
          </AnimatedPage>
        ),
      },
      {
        path: `/${Constants.PREFIX_COMMUNITY}:communityName`,
        element: (
          <AnimatedPage>
            <CommunityPage />
          </AnimatedPage>
        ),
      },
      {
        path: `/${Constants.PREFIX_COMMUNITY}:communityName/posts/:postId`,
        element: (
          <AnimatedPage>
            <PostPage />
          </AnimatedPage>
        ),
      },
      {
        path: "/create-post",
        element: (
          <AnimatedPage>
            <CreatePostPage />
          </AnimatedPage>
        ),
      },
      {
        path: "/create-community",
        element: (
          <AnimatedPage>
            <CreateCommunityPage />
          </AnimatedPage>
        ),
      },
      {
        path: "/register",
        element: (
          <AnimatedPage>
            <RegisterPage />
          </AnimatedPage>
        ),
      },
      {
        path: `/${Constants.PREFIX_COMMUNITY}:communityName/posts/:postId`,
        element: (
          <AnimatedPage>
            <PostPage />
          </AnimatedPage>
        ),
      },
    ],
  },
]);

export default router;
