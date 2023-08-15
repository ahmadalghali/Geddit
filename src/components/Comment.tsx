import { Avatar, Box, Collapse } from "@mantine/core";
import { IconArrowsDiagonal, IconBrandReddit } from "@tabler/icons-react";
import { CommentDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import { since } from "@/lib/utils/date-time";
import { AnimatePresence, motion } from "framer-motion";
import CommentsList from "@/components/CommentsList";
import ContentInteractions from "@/components/ContentInteractions";
import { useDisclosure } from "@mantine/hooks";

type Props = {
  comment: CommentDTO;
  isChild: boolean;
};

function Comment({ comment, isChild }: Props) {
  const [commentExpanded, { toggle: toggleCollapsed }] = useDisclosure(true);

  const datePosted = since(comment.createdDate);
  return (
    <motion.div>
      <Header
        author={comment.author}
        datePosted={datePosted}
        expandComment={toggleCollapsed}
        commentExpanded={commentExpanded}
      />
      <div className='pl-4 pt-1.5'>
        <Collapse in={commentExpanded}>
          <Content toggleCollapsed={toggleCollapsed} comment={comment} isChild={isChild} />
        </Collapse>
      </div>
    </motion.div>
  );
}

function Content({
  comment,
  isChild,
  toggleCollapsed,
}: {
  comment: CommentDTO;
  isChild: boolean;
  toggleCollapsed: () => void;
}) {
  return (
    <div className='flex'>
      <VerticalCollapsibleLine onClick={toggleCollapsed} />

      <div className='w-full'>
        {/* Comment */}
        <div className='ml-4 w-full'>
          <p className='whitespace-pre-line'>{comment.text}</p>
          <ContentInteractions commentCount={comment.replies.length} />
        </div>
        {/* Child */}
        <div className={"" + isChild ? "ml-5" : ""}>
          {comment.replies.length > 0 && (
            <>
              <br />
              <CommentsList comments={comment.replies} isChild={true} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({
  author,
  datePosted,
  expandComment,
  commentExpanded,
}: {
  author: string;
  datePosted: string;
  expandComment: () => void;
  commentExpanded: boolean;
}) {
  return (
    <motion.div className='flex items-center' transition={{ delay: 0.5, duration: 1 }}>
      <AnimatePresence mode='popLayout'>
        {!commentExpanded && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 50 }}
            animate={{ scale: 1, opacity: 1, x: 0 }}
            exit={{ scale: 0, opacity: 0, x: 20, transition: { duration: 1 } }}
            key={"1"}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <IconArrowsDiagonal color='gray' className='mr-2 cursor-pointer hover:text-black' onClick={expandComment} />
          </motion.div>
        )}

        <div className='flex items-center'>
          <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
            <IconBrandReddit size='30' />
          </Avatar>

          <p className='text-sm'>
            <span className='font-semibold '>
              {Constants.PREFIX_USER}
              {author}
            </span>
            <span className=''>
              <span className='mx-1'>·</span>
              <span>{datePosted}</span>
            </span>
          </p>
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

function VerticalCollapsibleLine({ onClick }: { onClick: () => void }) {
  return (
    <>
      <Box
        onClick={onClick}
        sx={{ borderLeft: "3px solid lightgray", ":hover": { borderLeft: "3px solid orange" } }}
        className='cursor-pointer'
      ></Box>
    </>
  );
}

export default Comment;
