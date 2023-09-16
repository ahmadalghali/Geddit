import PageTitle from "@/components/PageTitle";
import CreatePostForm from "@/components/CreatePostForm";
import { useNavigate } from "react-router-dom";

function CreatePostPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageTitle>Create a post</PageTitle>
      <CreatePostForm onDismiss={() => navigate(-1)} />
    </>
  );
}

export default CreatePostPage;
