import OptionsModal from "@/components/OptionsModal";
import { usePostContext } from "@/contexts/PostContext";
import { usePostModalContext } from "@/contexts/PostModalContext";
import { Constants } from "@/lib/constants";
import { notify } from "@/lib/notifications";
import { modals } from "@mantine/modals";
import { IconPencil, IconShare, IconTrash } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useCopyToClipboard } from "react-use";

function PostOptionsModal() {
  const { communityName } = useParams();

  const { closePostOptionsModal, postOptionsModalOpened, openEditDrawer } = usePostModalContext();

  const navigate = useNavigate();
  const [, copyToClipboard] = useCopyToClipboard();
  const { deletePost } = usePostContext();

  const handleShare = () => {
    copyToClipboard(window.location.href);
    closePostOptionsModal();
    notify("Post link copied to clipboard");
  };

  const handleDeletePost = async () => {
    const deleted = await deletePost();

    if (deleted) {
      navigate(`/${Constants.PREFIX_COMMUNITY}${communityName}`);
    }

    notify("Post deleted successfully");
  };

  const openDeletePostModal = () =>
    modals.openConfirmModal({
      title: "Delete post",
      centered: true,
      children: <p>Are you sure you want to delete this post? You will not be able to undo this action.</p>,
      labels: { confirm: "Delete", cancel: "Cancel" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleDeletePost(),
    });

  const handleDelete = () => {
    closePostOptionsModal();
    openDeletePostModal();
  };
  const handleEdit = () => {
    closePostOptionsModal();
    openEditDrawer();
  };

  return (
    <OptionsModal close={closePostOptionsModal} opened={postOptionsModalOpened}>
      <OptionsModal.Item onClick={handleShare} icon={<IconShare />}>
        Share
      </OptionsModal.Item>
      <OptionsModal.Item onClick={handleEdit} icon={<IconPencil />}>
        Edit
      </OptionsModal.Item>
      <OptionsModal.Item onClick={handleDelete} icon={<IconTrash />}>
        Delete
      </OptionsModal.Item>
    </OptionsModal>
  );
}

export default PostOptionsModal;
