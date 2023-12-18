import { IconArrowBigDown, IconArrowBigUp } from "@tabler/icons-react";
import { ContentVoteStatus, VoteState } from "@/types";
import { ActionIcon } from "@mantine/core";

type Props = {
  onUpvote: () => void;
  onDownvote: () => void;
  voteCount: number;
  voteStatus: ContentVoteStatus;
  setVoteCount: React.Dispatch<React.SetStateAction<number>>;
  voteState?: VoteState;
  setVoteState: React.Dispatch<React.SetStateAction<VoteState | undefined>>;
};

function ContentVotes({ onUpvote, onDownvote, voteStatus, voteCount = 0 }: Props) {
  return (
    <div className='flex items-center rounded-full p-2 text-gray-500 '>
      {/* <ActionIcon radius={"xl"} size={"lg"} variant='subtle' onClick={handleUpvote}> */}
      <ArrowUp active={voteStatus == "UPVOTED"} onClick={onUpvote} />
      {/* </ActionIcon> */}

      <p className='text-sm font-bold text-gray-500 text-center mx-1.5'>{voteCount}</p>

      {/* <ActionIcon radius={"xl"} size={"lg"} variant='subtle' onClick={handleDownvote}> */}
      <ArrowDown active={voteStatus == "DOWNVOTED"} onClick={onDownvote} />
      {/* </ActionIcon> */}
    </div>
  );
}

function ArrowUp({ active, onClick }: { active?: boolean; onClick: () => void }) {
  return (
    <>
      <ActionIcon radius={"xl"} color='gray' onClick={onClick}>
        {active ? (
          <IconArrowBigUp size='24' className='cursor-pointer' fill='green' stroke={0} />
        ) : (
          <IconArrowBigUp size='22' className='cursor-pointer' />
        )}
      </ActionIcon>
    </>
  );
}

function ArrowDown({ active, onClick }: { active?: boolean; onClick: () => void }) {
  return (
    <>
      <ActionIcon radius={"xl"} color='gray' onClick={onClick}>
        {active ? (
          <IconArrowBigDown size='24' className='cursor-pointer' fill='red' stroke={0} />
        ) : (
          <IconArrowBigDown size='22' className='cursor-pointer' />
        )}
      </ActionIcon>
    </>
  );
}

export default ContentVotes;
