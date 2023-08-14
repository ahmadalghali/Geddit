import { Avatar, Box } from "@mantine/core";
import { IconArrowsDiagonal, IconBrandReddit } from "@tabler/icons-react";
import { useState } from "react";
import { CommentDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import { since } from "@/lib/utils/date-time";
import { useLongPress } from "react-use";
import { AnimatePresence, motion } from "framer-motion";
import CommentsList from "@/components/CommentsList";
import ContentInteractions from "@/components/ContentInteractions";

type Props = {
  comment: CommentDTO;
  isChild: boolean;
};

function Comment({ comment, isChild }: Props) {
  const [collapsed, setCollapsed] = useState(false);

  const onLongPress = () => {
    setCollapsed((preVal) => !preVal);
  };

  const longPressEvent = useLongPress(onLongPress, { delay: 500 });
  const datePosted = since(comment.createdDate);
  return (
    <motion.div>
      <AnimatePresence>
        {collapsed ? (
          <CommentCollapsedView
            comment={comment}
            datePosted={datePosted}
            setCollapsed={setCollapsed}
            longPressEvent={longPressEvent}
          />
        ) : (
          <CommentExpandedView
            comment={comment}
            datePosted={datePosted}
            setCollapsed={setCollapsed}
            longPressEvent={longPressEvent}
            isChild={isChild}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function CommentExpandedView({ longPressEvent, setCollapsed, comment, datePosted, isChild }) {
  return (
    <div className='flex' {...longPressEvent}>
      <VerticalCollapsibleLine onClick={() => setCollapsed(true)} />

      <div className='w-full'>
        {/* Comment */}
        <div className='ml-4 w-full'>
          <Header author={comment.author} datePosted={datePosted} />
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

function CommentCollapsedView({ longPressEvent, setCollapsed, comment, datePosted }) {
  return (
    <div className='flex items-center' {...longPressEvent}>
      <IconArrowsDiagonal
        color='gray'
        className='mr-4 cursor-pointer hover:text-black'
        onClick={() => setCollapsed(false)}
      />
      <Header author={comment.author} datePosted={datePosted} />
    </div>
  );
}

function Header({ author, datePosted }: { author: string; datePosted: string }) {
  return (
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
