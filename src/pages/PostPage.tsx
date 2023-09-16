import { useParams } from "react-router";
import AddCommentBox from "@/components/AddCommentBox";
import CommentsList from "@/components/CommentsList";
import { createComment } from "@/api/comments";
import { CreateCommentDTO, PostDTO } from "@/types/dtos";
import { getPost } from "@/api/community-posts";
import { notifications } from "@mantine/notifications";
import { IconBrandReddit, IconBrandWechat, IconPencil, IconShare, IconTrash, IconX } from "@tabler/icons-react";
import { ActionIcon, Avatar, Button, Drawer, Textarea } from "@mantine/core";
import ContentInteractions from "@/components/ContentInteractions";
import { since } from "@/lib/utils/date-time";
import CommentSkeleton from "@/components/skeletons/CommentSkeleton";
import { AnimatePresence } from "framer-motion";
import PostContentSkeleton from "@/components/skeletons/PostContentSkeleton";
import { Constants } from "@/lib/constants";
import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "@mantine/core";
import { motion } from "framer-motion";
import usePost from "@/hooks/usePost";
import OptionsModal from "@/components/OptionsModal";
import { useDisclosure } from "@mantine/hooks";
import { useCopyToClipboard } from "react-use";
import { notify } from "@/lib/notifications";
import { patchUpdatePost } from "@/api/posts";
import { useState } from "react";
import { modals } from "@mantine/modals";
import DrawerEditText from "@/components/DrawerEditText";
import { PostModalProvider, usePostModalContext } from "@/contexts/PostModalContext";
import { CommentProvider } from "@/contexts/CommentContext";
function PostPage() {
  const { postId, communityName } = useParams();
  const [state, copyToClipboard] = useCopyToClipboard();

  const { post, isLoading, removeComment, editComment, addComment, deletePost, updatePostBody } = usePost(postId!);
  // const [postOptionsModalOpened, { close: closePostOptionsModal, open: openPostOptionsModal }] = useDisclosure(false);
  // const [commentpostOptionsModalOpened, { close: closeCommentOptionsModal, open: openCommentOptionsModal }] =
  //   useDisclosure(false);
  // const [editDrawerOpened, { close: closeEditDrawer, open: openEditDrawer }] = useDisclosure(false);
  // const [editCommentDrawerOpened, { close: closeEditCommentDrawer, open: openEditCommentDrawer }] =
  // useDisclosure(false);

  const { closePostOptionsModal, openPostOptionsModal, closeEditDrawer, openEditDrawer, editDrawerOpened } =
    usePostModalContext();
  const navigate = useNavigate();

  const handleShareClicked = () => {
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

  const handleUpdatePostBody = async (updatedPostBody: string) => {
    updatePostBody(updatedPostBody);
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

  return (
    <>
      <PostOptionsModal
        onDelete={() => {
          closePostOptionsModal();
          openDeletePostModal();
        }}
        onShare={handleShareClicked}
        onEdit={() => {
          closePostOptionsModal();
          openEditDrawer();
        }}
      />
      {post?.body && (
        <DrawerEditText
          close={closeEditDrawer}
          opened={editDrawerOpened}
          title={post?.title}
          text={post.body}
          onSave={(updatedPostBody) => handleUpdatePostBody(updatedPostBody)}
          resource='post'
        />
        // <DrawerEditPost
        //   close={closeDrawer}
        //   opened={drawerOpened}
        //   postTitle={post?.title}
        //   postBody={post.body}
        //   onSave={(updatedPostBody) => handleSave(updatedPostBody)}
        // />
      )}

      {/* <DrawerEditComment
        close={closeDrawer}
        opened={drawerOpened}
        postTitle={post?.title}
        postBody={post.body}
        onSave={(updatedPostBody) => handleSave(updatedPostBody)}
      /> */}

      <AnimatePresence>
        {isLoading ? (
          <PostPageSkeleton />
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <PostContent
              post={post!}
              onOptionsClicked={() => {
                console.log("test");
                openPostOptionsModal();
              }}
            />
            <AddCommentBox
              className='mt-5'
              onSubmit={(createCommentDTO: CreateCommentDTO) => addComment(createCommentDTO)}
            />

            <AnimatePresence mode='wait'>
              {post?.comments.length ? (
                <CommentsList
                  comments={post.comments.sort(
                    (a, b) => new Date(b.createdDate).valueOf() - new Date(a.createdDate).valueOf()
                  )}
                  isChild={false}
                  onDeleteComment={(commentId) => removeComment(commentId)}
                  onEditComment={(commentId, updatedText) => editComment(commentId, { text: updatedText })}
                  // closePostOptionsModal={closeCommentOptionsModal}
                  // postOptionsModalOpened={commentpostOptionsModalOpened}
                  // openPostOptionsModal={openCommentOptionsModal}
                />
              ) : (
                <NoCommentsYet />
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );

  function PostContent({ post, onOptionsClicked }: { post: PostDTO; onOptionsClicked: () => void }) {
    return (
      <div className=''>
        <div className='flex items-center gap-2'>
          <Avatar size={50} radius='xl' className='' color={"green"}>
            <IconBrandReddit size='25' />
          </Avatar>
          <div className=''>
            <Link to={`/${Constants.PREFIX_COMMUNITY}${post.communityName}`}>
              <p className='font-semibold'>
                {Constants.PREFIX_COMMUNITY}
                {post.communityName}
              </p>
            </Link>

            <p className='text-[.8rem] font-semibold text-gray-500'>
              {Constants.PREFIX_USER}
              {post.authorUsername}
              <span>
                <span className='mx-1'>·</span>
                <span>{since(post.createdDate)}</span>
              </span>
            </p>
          </div>
        </div>
        <h1 className='font-semibold text-2xl mt-4'>{post.title}</h1>
        {post.body && <p className='mt-10 whitespace-pre-line'>{post.body}</p>}

        <ContentInteractions commentCount={post.comments.length} className='mt-5' onOptionsClicked={onOptionsClicked} />
      </div>
    );
  }

  function NoCommentsYet() {
    return (
      <div className='flex flex-col items-center mt-20 gap-5 opacity-40'>
        <IconBrandWechat size={60} strokeWidth={1.5} />
        <p className='font-bold text-lg'>Be the first to comment</p>
      </div>
    );
  }
}

const PostPageSkeleton = () => (
  <motion.div animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <PostContentSkeleton />
    <CommentBoxSkeleton />
    <CommentSkeleton count={10} />
  </motion.div>
);

function CommentBoxSkeleton() {
  return (
    <div className='mt-5'>
      <Skeleton height={130} radius={"md"} />
      <div className='flex justify-end'>
        <Skeleton height={35} width={75} radius={"xl"} className='mt-3' />
      </div>
    </div>
  );
}

function PostOptionsModal({ onShare, onDelete, onEdit }) {
  const { closePostOptionsModal, postOptionsModalOpened } = usePostModalContext();
  return (
    <OptionsModal close={closePostOptionsModal} opened={postOptionsModalOpened}>
      <OptionsModal.Item onClick={onShare} icon={<IconShare />}>
        Share
      </OptionsModal.Item>
      <OptionsModal.Item onClick={onEdit} icon={<IconPencil />}>
        Edit
      </OptionsModal.Item>
      <OptionsModal.Item onClick={onDelete} icon={<IconTrash />}>
        Delete
      </OptionsModal.Item>
    </OptionsModal>
  );
}

// function DrawerEditPost({
//   close,
//   opened,
//   postBody,
//   postTitle,
//   onSave,
// }: {
//   onSave: (text: string) => void;
//   postTitle: string;
//   postBody: string;
//   close: () => void;
//   opened: boolean;
// }) {
//   const [updatedPostBody, setUpdatedPostBody] = useState<string>(postBody);

//   // const resetToInitialState = () => {
//   //   setUpdatedPostBody("");
//   // };

//   const handleClose = () => {
//     close();
//   };

//   const handleSave = (updatedPostBody: string) => {
//     onSave(updatedPostBody);
//     close();
//   };
//   return (
//     <Drawer.Root
//       classNames={{ body: "max-w-3xl mx-auto" }}
//       onClose={close}
//       opened={opened}
//       position='bottom'
//       size='90%'
//     >
//       <Drawer.Overlay />
//       <Drawer.Content>
//         <Drawer.Header className='mr-8 '>
//           <div className='flex justify-between items-center w-full px-0 mx-0'>
//             <div className=''>
//               <Drawer.CloseButton onClick={handleClose}>
//                 <IconX />
//               </Drawer.CloseButton>
//             </div>
//             <Drawer.Title sx={{ fontWeight: "600", fontSize: "1.2rem" }} className='text-gray-500'>
//               Edit Post
//             </Drawer.Title>
//             <div className=''>
//               <Drawer.CloseButton onClick={() => handleSave(updatedPostBody)} className='mt-2 '>
//                 <Button>SAVE</Button>
//               </Drawer.CloseButton>
//             </div>
//           </div>
//         </Drawer.Header>
//         <Drawer.Body>
//           <p className='font-bold text-2xl'>{postTitle}</p>
//           <Textarea
//             className='mt-5'
//             minRows={10}
//             value={updatedPostBody}
//             onChange={(e) => setUpdatedPostBody(e.target.value)}
//           />
//         </Drawer.Body>
//       </Drawer.Content>
//     </Drawer.Root>
//   );
// }
export default PostPage;
