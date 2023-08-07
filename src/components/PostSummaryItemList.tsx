import { Link } from "react-router-dom";
import { PostSummaryDTO } from "../types/dto";
import PostSummaryItem from "./PostSummaryItem";

type Props = {
  posts: PostSummaryDTO[];
};

function CommentsList({ posts }: Props) {
  return (
    <ul className='space-y-2'>
      {posts.map((post) => (
        <li>
          <Link to={`/g/${post.communityName}/posts/${post.id}`}>
            <PostSummaryItem post={post} />
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default CommentsList;
