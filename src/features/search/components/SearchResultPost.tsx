import { Avatar } from "@mantine/core";
import { IconBrandReddit } from "@tabler/icons-react";
import { Constants } from "@/lib/constants";
import { PostSummaryDTO } from "@/types/dtos";
import { motion } from "framer-motion";
import { since } from "@/lib/utils/date-time";
import { Link } from "react-router-dom";

type Props = {
  post: PostSummaryDTO;
};

function SearchResultPost({ post }: Props) {
  const formattedDate = since(post.createdDate);

  return (
    <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}/posts/${post.id}`}>
      <motion.div
        className='bg-white p-2 cursor-pointer sm:rounded-md hover:bg-zinc-100 transition-all'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className='flex items-center'>
          <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
            <IconBrandReddit size='25' />
          </Avatar>
          <p className='font-semibold text-sm'>
            {Constants.PREFIX_COMMUNITY}
            {post.communityName}
            <span className='text-xs font-semibold text-gray-400'>
              <span className='mx-1'>·</span>
              <span>{formattedDate}</span>
            </span>
          </p>
        </div>
        <p className='font-medium'>{post.title}</p>
        <div className='flex text-xs font-semibold text-gray-500 gap-3 mt-3'>
          <p>{post.voteCount ?? 0} upvotes</p>
          <p>{post.commentCount ?? 0} comments</p>
        </div>
      </motion.div>
    </Link>
  );
}

export default SearchResultPost;
