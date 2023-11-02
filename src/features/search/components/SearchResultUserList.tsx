import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { UserDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import SearchResultUser from "@/features/search/components/SearchResultUser";
type Props = {
  users: UserDTO[];
};
function SearchResultUserList({ users }: Props) {
  return (
    <motion.ul>
      <AnimatePresence>
        users
        {users.map((user, index) => (
          <motion.li
            key={user.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className='hover:bg-gray-100 cursor-pointer'
          >
            <Link to={`/${Constants.PREFIX_USER}${user.username}`}>
              <SearchResultUser user={user} />
            </Link>
            <hr className='mt-1' />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default SearchResultUserList;
