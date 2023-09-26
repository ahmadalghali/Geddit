import { AnimatePresence, motion } from "framer-motion";
import { CommentDTO, CreateCommentDTO } from "@/types/dtos";
import OptionsModal from "@/components/OptionsModal";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import DrawerEditText from "@/components/DrawerEditText";
import { useCommentContext } from "@/contexts/CommentContext";
import { modals } from "@mantine/modals";
import { useState } from "react";
import Comment from "@/features/comments/components/Comment";
import DrawerCreateComment from "@/components/DrawerCreateComment";
import { usePostContext } from "@/contexts/PostContext";
import { cn } from "@/lib/utils/classname";
import { usePostModalContext } from "@/contexts/PostModalContext";

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

      {selectedComment && <CommentOptionsModal selectedComment={selectedComment} />}

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

function CommentOptionsModal({ selectedComment }) {
  const { closeOptionsModal, optionsModalOpened, openEditDrawer } = useCommentContext();
  const { removeComment } = usePostContext();

  const openDeleteCommentModal = (commentId: string) => {
    modals.openConfirmModal({
      title: "Delete comment",
      centered: true,
      children: <p>Are you sure you want to delete this comment? You will not be able to undo this action.</p>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => removeComment(commentId),
    });
  };

  return (
    <OptionsModal close={closeOptionsModal} opened={optionsModalOpened}>
      <OptionsModal.Item
        onClick={() => {
          closeOptionsModal();
          openDeleteCommentModal(selectedComment.id);
        }}
        icon={<IconTrash />}
      >
        Delete
      </OptionsModal.Item>
      <OptionsModal.Item
        onClick={() => {
          closeOptionsModal();
          openEditDrawer();
        }}
        icon={<IconPencil />}
      >
        Edit
      </OptionsModal.Item>
    </OptionsModal>
  );
}

export default CommentsList;
