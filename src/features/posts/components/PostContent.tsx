import { PostDTO } from "@/types/dtos";
import { IconBrandReddit } from "@tabler/icons-react";
import { Avatar } from "@mantine/core";
import ContentInteractions from "@/features/shared/components/ContentInteractions";
import { since } from "@/lib/utils/date-time";
import { Constants } from "@/lib/constants";
import { Link } from "react-router-dom";
import { usePostContext } from "@/contexts/PostContext";

function PostContent({ post, onOptionsClicked }: { post: PostDTO; onOptionsClicked: () => void }) {
  const { handleUpvotePost, handleDownvotePost } = usePostContext();
  return (
    <div className=''>
      <div className='flex items-center gap-2'>
        <Avatar size={50} radius='xl' className='' color={"green"}>
          <IconBrandReddit size='25' />
        </Avatar>
        <div className=''>
          <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}`}>
            <p className='font-semibold'>
              {Constants.PREFIX_COMMUNITY}
              {post.communityName}
            </p>
          </Link>

          <p className='text-[.8rem] font-semibold text-gray-500'>
            {Constants.PREFIX_USER}
            {post.author.username}
            <span>
              <span className='mx-1'>·</span>
              <span>{since(post.createdDate)}</span>
            </span>
          </p>
        </div>
      </div>
      <h1 className='font-semibold text-2xl mt-4'>{post.title}</h1>
      {post.body && <p className='mt-10 whitespace-pre-line break-words'>{post.body}</p>}
      <ContentInteractions
        onUpvote={handleUpvotePost}
        onDownvote={handleDownvotePost}
        voteCount={post.voteCount}
        voteStatus={post.voteStatus}
        commentCount={post.comments.length}
        className='mt-5'
        onOptionsClicked={onOptionsClicked}
      />
    </div>
  );
}

export default PostContent;
