import { Avatar, Collapse } from "@mantine/core";
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
    <motion.div
      layout
      key={comment.id}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", duration: 0.7 }}
    >
      <Header
        author={comment.author}
        datePosted={datePosted}
        expandComment={toggleCollapsed}
        commentExpanded={commentExpanded}
      />
      <div className='pl-1.5 pt-1.5'>
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
    <motion.div className='flex items-center' transition={{ duration: 0.6 }}>
      <AnimatePresence mode='popLayout'>
        {!commentExpanded && (
          <motion.div
            initial={{ scale: 0, x: 20 }}
            animate={{ scale: 1, x: 0, transition: { duration: 0.5, type: "spring" } }}
            exit={{ scale: 0, transition: { duration: 0.5, type: "spring" } }}
            key={"1"}
            transition={{ duration: 0.3, type: "spring" }}
            className='text-gray-500 hover:text-orange-400 group cursor-pointer'
          >
            <IconArrowsDiagonal
              className='mr-2 group-hover:scale-110 transition-all duration-150'
              onClick={expandComment}
            />
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
    <div onClick={onClick} className='flex justify-center group relative w-7 cursor-pointer'>
      <div
        className='h-full absolute 
        transition-all
        duration-200
        border-l-[.2rem]
      border-gray-300
        group-hover:scale-x-150
      group-hover:border-orange-400
      '
      ></div>
    </div>
  );
}

export default Comment;
