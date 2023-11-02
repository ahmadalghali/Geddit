import { Avatar, Collapse } from "@mantine/core";
import { IconArrowsDiagonal, IconBrandReddit } from "@tabler/icons-react";
import { CommentDTO, CreateCommentDTO } from "@/types/dtos";
import { Constants } from "@/lib/constants";
import { since } from "@/lib/utils/date-time";
import { AnimatePresence, motion } from "framer-motion";
import CommentsList from "@/features/comments/components/CommentsList";
import ContentInteractions from "@/features/shared/components/ContentInteractions";
import { useDisclosure } from "@mantine/hooks";
import { useCommentContext } from "@/contexts/CommentContext";
import { usePostContext } from "@/contexts/PostContext";
import { useSearchParams } from "react-router-dom";

type Props = {
  comment: CommentDTO;
  isChild: boolean;
  setSelected: (comment: CommentDTO) => void;
};

function Comment({ comment, isChild, setSelected }: Props) {
  const [commentExpanded, { toggle: toggleCollapsed }] = useDisclosure(true);

  const datePosted = since(comment.createdDate);

  const { openOptionsModal, toggleCreateCommentDrawer } = useCommentContext();

  const { post } = usePostContext();

  const authorIsMe = post?.author.username == comment.author.username;

  const [searchParams] = useSearchParams();
  const highlightedCommentId = searchParams.get("highlightedCommentId");

  const isHighlighted = highlightedCommentId && highlightedCommentId === comment.id;
  return (
    <>
      <motion.div
        // layout
        key={comment.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", duration: 0.7 }}
        className={
          isHighlighted
            ? "bg-amber-50 py-3 px-1 rounded-md outline outline-4 outline-offset-1 outline-amber-400 shadow-2xl"
            : ""
        }
      >
        <Header
          authorUsername={comment.author.username}
          isAuthor={authorIsMe}
          datePosted={datePosted}
          expandComment={toggleCollapsed}
          commentExpanded={commentExpanded}
        />
        <div className='pl-1.5 pt-1.5'>
          <Collapse in={commentExpanded}>
            <Content
              toggleCollapsed={toggleCollapsed}
              comment={comment}
              isChild={isChild}
              onReplyClicked={() => {
                setSelected(comment);
                toggleCreateCommentDrawer();
              }}
              onOptionsClicked={() => {
                setSelected(comment);
                openOptionsModal();
              }}
              onAddReply={() => alert("not implemented yet")}
            />
          </Collapse>
        </div>
      </motion.div>
    </>
  );
}

function Content({
  comment,
  toggleCollapsed,
  onOptionsClicked,
  // onAddReply,
  onReplyClicked,
}: {
  comment: CommentDTO;
  isChild: boolean;
  toggleCollapsed: () => void;
  onOptionsClicked: () => void;
  onReplyClicked: () => void;
  onAddReply: (createCommentDTO: CreateCommentDTO) => void;
}) {
  // const [replyToCommentBoxOpened, { toggle: toggleReplyToCommentBox }] = useDisclosure(false);
  const { handleUpvoteComment, handleDownvoteComment } = usePostContext();
  return (
    <div className='flex'>
      <VerticalCollapsibleLine onClick={toggleCollapsed} />
      <div className='w-full'>
        {/* Comment */}
        <div className='ml-4 w-full'>
          <p className='whitespace-pre-line break-words pr-5'>{comment.text}</p>
          <ContentInteractions
            onUpvote={() => handleUpvoteComment(comment.id)}
            onDownvote={() => handleDownvoteComment(comment.id)}
            voteCount={comment.voteCount}
            voteStatus={comment.voteStatus}
            showCommentsCount={false}
            onOptionsClicked={onOptionsClicked}
            showReplyButton
            onReplyClicked={onReplyClicked}
          />
        </div>
        {/* {replyToCommentBoxOpened && <AddCommentBox onSubmit={onAddReply} />} */}

        {/* Child */}
        {comment.replies.length > 0 && <CommentsList comments={comment.replies} isChild={true} className='mt-5' />}
      </div>
    </div>
  );
}

function Header({
  authorUsername,
  datePosted,
  expandComment,
  commentExpanded,
  isAuthor,
}: {
  authorUsername: string;
  datePosted: string;
  expandComment: () => void;
  commentExpanded: boolean;
  isAuthor: boolean;
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
              {authorUsername}
            </span>
            {isAuthor && (
              <>
                <span className='mx-1'>·</span>
                <span className='font-bold text-blue-600 text-[.9rem]'>Author</span>
              </>
            )}
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
