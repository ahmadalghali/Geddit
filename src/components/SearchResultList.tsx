import { cn } from "@/lib/utils/classname";
import { IconSearch } from "@tabler/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
type Props<T> = {
  searchResults: T[];
  renderItem: (item: T) => ReactNode;
  getKey: (item: T) => string; // Function to get a unique key for each item
};

function SearchResultList<T>({ searchResults, renderItem, getKey }: Props<T>) {
  return (
    <>
      {searchResults.length ? (
        <motion.ul>
          <AnimatePresence>
            {searchResults.map((searchResult) => (
              <motion.li
                key={getKey(searchResult)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                // transition={{ delay: index * 0.03 }}
                className='hover:bg-gray-100 cursor-pointer'
              >
                {renderItem(searchResult)}
                <hr className='mt-1' />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <NoSearchResults className='mt-20' />
      )}
    </>
  );
}

function NoSearchResults({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col items-center text-gray-400", className)}>
      <IconSearch size='60' />
      <p className='text-2xl font-semibold'>No results</p>
    </div>
  );
}

export default SearchResultList;
