import { Avatar, Box } from "@mantine/core";
import { IconArrowBigDown, IconArrowBigUp, IconBrandReddit, IconDots, IconMessageCircle } from "@tabler/icons-react";
import { PostSummaryDTO } from "../types/dto";

type Props = {
  post: PostSummaryDTO;
};

function PostSummaryItem({ post }: Props) {
  return (
    <Box className='px-6 py-4 cursor-pointer sm:rounded-md border-2 border-gray-100  hover:bg-gray-100 transition-all'>
      <div className='flex items-center'>
        <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
          <IconBrandReddit size='25' />
        </Avatar>
        <p className='font-semibold text-sm'>r/{post.communityName}</p>

        <p className='text-xs ml-3 font-semibold text-gray-500'>u/{"testuser"}</p>
        <IconDots size='20' color='gray' className='cursor-pointer ml-auto' />
      </div>
      <p className='font-semibold text-xl mt-2'>{post.title}</p>
      <p className='whitespace-pre-line mt-8 mb-2'>{post.body?.substring(0, 200)}</p>

      <div className='mt-5 flex items-center space-x-4'>
        <div className='flex items-center space-x-1'>
          <IconArrowBigUp size='23' color='gray' className='cursor-pointer' />
          <p className='text-sm text-gray-500 font-medium'>{post.upvotes ?? 0}</p>
        </div>
        <IconArrowBigDown size='23' color='gray' className='cursor-pointer' />
        <div className='flex items-center space-x-1 pl-10'>
          <IconMessageCircle size='23' color='gray' className='cursor-pointer' />
          <p className='text-sm text-gray-500 font-medium'>{post.commentCount} Comments</p>
        </div>
      </div>
    </Box>
  );
}

export default PostSummaryItem;
