import { AnimatePresence, motion } from "framer-motion";
import { CommentDTO } from "@/types/dtos";
import DrawerEditText from "@/components/DrawerEditText";
import { useCommentContext } from "@/contexts/CommentContext";
import { useState } from "react";
import Comment from "@/features/comments/components/Comment";
import DrawerCreateComment from "@/features/comments/components/DrawerCreateComment";
import { usePostContext } from "@/contexts/PostContext";
import { cn } from "@/lib/utils/classname";
import CommentOptionsModal from "@/features/comments/components/CommentOptionsModal";
import { useAuthContext } from "@/contexts/AuthContext";

type Props = {
  comments: CommentDTO[];
  isChild: boolean;
  className?: string;
};

function CommentsList({ comments, className }: Props) {
  const [selectedComment, setSelectedComment] = useState<CommentDTO | null>(null);

  const { closeEditDrawer, editDrawerOpened, createCommentDrawerOpened, closeCreateCommentDrawer } =
    useCommentContext();

  const { editComment, addCommentReply } = usePostContext();

  const { user } = useAuthContext();

  const isAuthor = selectedComment?.author.id == user?.id;

  return (
    <>
      {selectedComment && (
        <DrawerEditText
          close={closeEditDrawer}
          opened={editDrawerOpened}
          text={selectedComment.text}
          onSave={(updatedCommentText) => editComment(selectedComment.id, { text: updatedCommentText })}
          resource='comment'
        />
      )}

      {selectedComment && (
        <DrawerCreateComment
          close={closeCreateCommentDrawer}
          onSubmit={(text) => addCommentReply(selectedComment.id, { text })}
          opened={createCommentDrawerOpened}
        />
      )}

      {selectedComment && (
        <CommentOptionsModal deletable={isAuthor} editable={isAuthor} selectedComment={selectedComment} />
      )}

      <motion.ul className={cn("space-y-10 bg-white", className)}>
        <AnimatePresence>
          {comments.map((comment, index) => {
            return (
              <motion.li
                key={comment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              >
                <Comment comment={comment} isChild={false} setSelected={setSelectedComment} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

export default CommentsList;
