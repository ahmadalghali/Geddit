import { Avatar, Box } from "@mantine/core";
import {
  IconArrowBigDown,
  IconArrowBigUp,
  IconArrowsDiagonal,
  IconBrandReddit,
  IconDots,
  IconMessageCircle,
} from "@tabler/icons-react";
import { useState } from "react";
import CommentsList from "./CommentsList";
import { CommentDTO } from "../types/dto";

type Props = {
  comment: CommentDTO;
  isChild: boolean;
};

function Comment({ comment, isChild }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      {collapsed ? (
        <div className='flex items-center'>
          <IconArrowsDiagonal
            color='gray'
            className='mr-4 cursor-pointer hover:text-black'
            onClick={() => setCollapsed(false)}
          />
          <Header author={comment.author} />
        </div>
      ) : (
        <div className='flex'>
          <VerticalCollapsibleLine onClick={() => setCollapsed(true)} />

          <div className=''>
            {/* Comment */}
            <div className='flex '>
              <div className='ml-4 '>
                <Header author={comment.author} />
                <p className='whitespace-pre-line'>{comment.text}</p>

                <div className='mt-3 flex items-center justify-end space-x-4'>
                  <IconArrowBigUp size='20' color='gray' className='cursor-pointer' />
                  <IconArrowBigDown size='20' color='gray' className='cursor-pointer' />
                  <IconMessageCircle size='20' color='gray' className='cursor-pointer' />
                  <IconDots size='20' color='gray' className='cursor-pointer' />
                </div>
              </div>
            </div>
            <br />
            {/* Child */}
            <div className={"" + isChild ? "ml-5" : ""}>
              {comment.replies.length > 0 && <CommentsList comments={comment.replies} isChild={true} />}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Header({ author }: { author: string }) {
  return (
    <div className='flex items-center'>
      <Avatar size='md' radius='xl' className='mr-1' color={"green"}>
        <IconBrandReddit size='30' />
      </Avatar>
      <p className='text-sm font-semibold '>{author}</p>
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
