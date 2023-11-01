import { Avatar, Box } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { PostSummaryDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import { Link } from "react-router-dom";
import { since } from "@/lib/utils/date-time";
import ContentInteractions from "@/features/shared/components/ContentInteractions";

type Props = {
  post: PostSummaryDTO;
};

function PostSummaryItem({ post }: Props) {
  const formattedDate = since(post.createdDate);

  return (
    <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}/posts/${post.id}`}>
      <Box className='px-6 py-4 cursor-pointer sm:rounded-md border-2 border-gray-100  hover:bg-gray-100 transition-all'>
        <div className='flex items-center'>
          <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
            <IconBrandReddit size='25' />
          </Avatar>
          <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}`}>
            <p className='font-semibold text-sm'>
              {Constants.PREFIX_COMMUNITY}
              {post.communityName}
              <span className='text-xs font-semibold text-gray-400'>
                <span className='mx-1'>·</span>
                <span>{formattedDate}</span>
              </span>
            </p>
          </Link>

          {/* <IconDots size='20' color='gray' className='cursor-pointer ml-auto' /> */}
        </div>
        <p className='font-semibold text-xl mt-2'>{post.title}</p>
        <p className='whitespace-pre-line mt-8 mb-2 break-words'>{post.body?.substring(0, 200)}</p>

        <ContentInteractions
          voteCount={post.voteCount}
          commentCount={post.commentCount}
          showOptions={false}
          onOptionsClicked={() => {}}
        />
      </Box>
    </Link>
  );
}

export default PostSummaryItem;
