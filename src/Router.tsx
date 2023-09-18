import { createBrowserRouter } from "react-router-dom";
import LandingPage from "@/pages/LandingPage";
import RootLayout from "@/layouts/RootLayout";
import SearchPage from "@/pages/SearchResultsPage";
import CommunityPage from "@/pages/CommunityPage";
import CreatePostPage from "@/pages/CreatePostPage";
import CreateCommunityPage from "@/pages/CreateCommunityPage";
import RegisterPage from "@/pages/RegisterPage";
import PostPage from "@/pages/PostPage";
import ExploreCommunitiesPage from "@/pages/ExploreCommunitiesPage";
import SignInPage from "@/pages/SignInPage";
import { Constants } from "@/lib/constants";
import UserProfilePage from "@/pages/UserProfilePage";
import ProfilePageLayout from "@/layouts/ProfilePageLayout";
import { PostModalProvider } from "@/contexts/PostModalContext";
import { CommentProvider } from "@/contexts/CommentContext";

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
        path: "/explore",
        element: <ExploreCommunitiesPage />,
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
        path: `/${Constants.PREFIX_COMMUNITY}:communityName/posts/:postId`,
        element: (
          <PostModalProvider>
            <CommentProvider>
              <PostPage />
            </CommentProvider>
          </PostModalProvider>
        ),
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
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
    ],
  },
  {
    path: `/${Constants.PREFIX_USER}:username`,
    element: <ProfilePageLayout />,
    children: [
      {
        index: true,
        element: <UserProfilePage />,
      },
    ],
  },
]);

export default router;
