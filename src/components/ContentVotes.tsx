import { IconArrowBigDown, IconArrowBigUp } from "@tabler/icons-react";
import { VoteState } from "../types";
import { ActionIcon } from "@mantine/core";

type Props = {
  voteCount: number;
  setVoteCount: React.Dispatch<React.SetStateAction<number>>;
  voteState?: VoteState;
  setVoteState: React.Dispatch<React.SetStateAction<VoteState | undefined>>;
};

function ContentVotes({ voteCount = 0, setVoteCount, voteState, setVoteState }: Props) {
  const handleUpvote = () => {
    setVoteState((prevVal) => (prevVal == "UPVOTED" ? undefined : "UPVOTED"));
    setVoteCount((prevVal) => {
      switch (voteState) {
        case undefined:
          return prevVal + 1;
        case "DOWNVOTED":
          return prevVal + 2;
        case "UPVOTED":
          return prevVal - 1;
      }
    });
  };

  const handleDownvote = () => {
    setVoteState((prevVal) => (prevVal == "DOWNVOTED" ? undefined : "DOWNVOTED"));
    setVoteCount((prevVal) => {
      switch (voteState) {
        case undefined:
          return prevVal - 1;
        case "DOWNVOTED":
          return prevVal + 1;
        case "UPVOTED":
          return prevVal - 2;
      }
    });
  };

  return (
    <div className='flex items-center  rounded-full p-2 text-gray-500 '>
      {/* <ActionIcon radius={"xl"} size={"lg"} variant='subtle' onClick={handleUpvote}> */}
      <ArrowUp active={voteState == "UPVOTED"} onClick={handleUpvote} />
      {/* </ActionIcon> */}

      <p className='text-sm font-bold text-gray-500 text-center mx-1.5'>{voteCount}</p>

      {/* <ActionIcon radius={"xl"} size={"lg"} variant='subtle' onClick={handleDownvote}> */}
      <ArrowDown active={voteState == "DOWNVOTED"} onClick={handleDownvote} />
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
