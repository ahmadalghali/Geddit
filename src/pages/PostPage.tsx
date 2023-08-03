import { useParams } from "react-router-dom";
import { getPost } from "../api/posts";
import { useEffect, useState } from "react";
import { PostDto } from "../types/dto";

function PostPage() {
  const { communityName, postId } = useParams();
  const [post, setPost] = useState<PostDto>();
  useEffect(() => {
    const fetchPost = async () => {
      if (communityName != undefined && postId != undefined) {
        const postResponse = await getPost(communityName, postId);
        setPost(postResponse);
      }
    };
    fetchPost();
  }, []);
  if (!post) return;

  return (
    <div>
      <div>
        <p>g/{post.communityName}</p>
        <p>Posted by: no one</p>
        <h1>{post.title}</h1>
        <p className="mt-10">{post.body}</p>
      </div>
    </div>
  );
}

export default PostPage;
