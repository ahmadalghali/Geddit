import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CommunitySummaryDTO } from "types/dto";
import Constants from "../constants";
import SearchResultCommunity from "./SearchResultCommunity";
type Props = {
  searchResults: CommunitySummaryDTO[];
};
function SearchResultCommunityList({ searchResults }: Props) {
  return (
    <motion.ul>
      <AnimatePresence>
        {searchResults.map((searchResult, index) => (
          <motion.li
            key={searchResult.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className='hover:bg-gray-100 cursor-pointer'
          >
            <Link to={`/${Constants.PREFIX_COMMUNITY}${searchResult.name}`}>
              <SearchResultCommunity community={searchResult} />
            </Link>
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default SearchResultCommunityList;
