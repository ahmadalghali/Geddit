import { AnimatePresence, motion } from "framer-motion";
import { CommentDTO } from "../types/dto";
import Comment from "./Comment";

type Props = {
  comments: CommentDTO[];
  isChild: boolean;
};

function CommentsList({ comments }: Props) {
  return (
    <motion.ul className='space-y-10 bg-white'>
      <AnimatePresence>
        {comments.map((comment, index) => (
          <motion.li
            key={comment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Comment comment={comment} isChild={false} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}

export default CommentsList;
