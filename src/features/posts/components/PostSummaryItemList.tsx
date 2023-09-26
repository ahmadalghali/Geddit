import { motion } from "framer-motion";
import { PostSummaryDTO } from "@/types/dtos";
import PostSummaryItem from "@/features/posts/components/PostSummaryItem";
type Props = {
  posts: PostSummaryDTO[];
};

function PostSummaryItemList({ posts }: Props) {
  return (
    <motion.ul className='space-y-2'>
      {posts.map((post, index) => (
        <motion.li
          key={post.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <PostSummaryItem post={post} />
        </motion.li>
      ))}
    </motion.ul>
  );
}

export default PostSummaryItemList;
