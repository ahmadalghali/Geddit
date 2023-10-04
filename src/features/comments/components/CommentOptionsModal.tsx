import OptionsModal from "@/components/OptionsModal";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { useCommentContext } from "@/contexts/CommentContext";
import { modals } from "@mantine/modals";
import { usePostContext } from "@/contexts/PostContext";
import { CommentDTO } from "@/types/dtos";

type Props = {
  selectedComment: CommentDTO;
  editable?: boolean;
  deletable?: boolean;
};

function CommentOptionsModal({ selectedComment, editable, deletable }: Props) {
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
      {editable && (
        <OptionsModal.Item
          onClick={() => {
            closeOptionsModal();
            openEditDrawer();
          }}
          icon={<IconPencil />}
        >
          Edit
        </OptionsModal.Item>
      )}
      {deletable && (
        <OptionsModal.Item
          onClick={() => {
            closeOptionsModal();
            openDeleteCommentModal(selectedComment.id);
          }}
          icon={<IconTrash />}
        >
          Delete
        </OptionsModal.Item>
      )}
    </OptionsModal>
  );
}

export default CommentOptionsModal;
