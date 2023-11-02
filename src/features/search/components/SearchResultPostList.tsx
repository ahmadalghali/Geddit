import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PostSummaryDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import SearchResultPost from "@/features/search/components/SearchResultPost";
type Props = {
  posts: PostSummaryDTO[];
};
function SearchResultPostList({ posts }: Props) {
  return (
    <motion.ul>
      <AnimatePresence>
        {posts.map((post, index) => (
          <motion.li
            key={post.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className='hover:bg-gray-100 cursor-pointer'
          >
            <Link to={`/${Constants.PREFIX_COMMUNITY}/${post.communityName}/${post.id}`}>
              <SearchResultPost post={post} />
            </Link>
            <hr className='mt-1' />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default SearchResultPostList;
