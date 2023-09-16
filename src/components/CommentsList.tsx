import { AnimatePresence, motion } from "framer-motion";
import { CommentDTO } from "@/types/dtos";
import Comment from "@/components/Comment";
import OptionsModal from "@/components/OptionsModal";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import DrawerEditText from "@/components/DrawerEditText";
import { useCommentContext } from "@/contexts/CommentContext";
import { modals } from "@mantine/modals";
import { useState } from "react";

type Props = {
  comments: CommentDTO[];
  isChild: boolean;
  onDeleteComment: (commentId: string) => void;
  onEditComment: (commentId: string, updatedText: string) => void;
  // closeOptionsModal: () => void;
  // optionsModalOpened: boolean;
  // openOptionsModal: () => void;
};

function CommentsList({
  comments,
  onDeleteComment,
  onEditComment, // onEditComment,
  // closeOptionsModal,
} // optionsModalOpened,
// openOptionsModal,
: Props) {
  const [selectedComment, setSelectedComment] = useState<CommentDTO | null>(null);

  const { closeOptionsModal, openOptionsModal, openEditDrawer, optionsModalOpened, closeEditDrawer, editDrawerOpened } =
    useCommentContext();

  const openDeleteCommentModal = (commentId: string) => {
    modals.openConfirmModal({
      title: "Delete comment",
      centered: true,
      children: <p>Are you sure you want to delete this comment? You will not be able to undo this action.</p>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => onDeleteComment(commentId),
    });
  };
  return (
    <>
      {selectedComment && (
        <DrawerEditText
          close={closeEditDrawer}
          opened={editDrawerOpened}
          title={"title here"}
          text={selectedComment.text}
          onSave={(updatedCommentText) => onEditComment(selectedComment.id, updatedCommentText)}
          resource='comment'
        />
      )}

      {selectedComment && (
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
      )}

      <motion.ul className='space-y-10 bg-white'>
        <AnimatePresence>
          {comments.map((comment, index) => (
            <motion.li
              key={comment.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Comment
                comment={comment}
                isChild={false}
                onDelete={() => onDeleteComment(comment.id)}
                onEdit={(updatedCommentText) => onEditComment(comment.id, updatedCommentText)}
                setSelected={setSelectedComment}
                // closeOptionsModal={closeOptionsModal}
                // optionsModalOpened={optionsModalOpened}
                // openOptionsModal={openOptionsModal}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}

export default CommentsList;
