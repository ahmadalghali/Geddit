import { IconDots, IconMessageCircle } from "@tabler/icons-react";
import { cn } from "@/lib/utils/classname";
import { VoteState } from "@/types/index";
import { useState } from "react";
import ContentVotes from "@/components/ContentVotes";

type Props = {
  commentCount: number;
  className?: string;
};

function ContentInteractions({ commentCount = 0, className }: Props) {
  const [voteCount, setVoteCount] = useState(0);
  const [voteState, setVoteState] = useState<VoteState>();
  return (
    <div className={cn("mt-5 flex items-center space-x-5", className ?? "")}>
      <ContentVotes
        voteCount={voteCount}
        setVoteCount={setVoteCount}
        voteState={voteState}
        setVoteState={setVoteState}
      />
      <Comments commentCount={commentCount} />

      <IconDots size='36' color='gray' className='cursor-pointer  p-1.5 rounded-full hover:bg-zinc-100' />
    </div>
  );
}

function Comments({ commentCount }: { commentCount: number }) {
  return (
    <div className='flex items-center cursor-pointer space-x-1 hover:bg-zinc-100 rounded-full py-1.5 px-2.5 '>
      <IconMessageCircle size='22' color='gray' />
      <p className='text-sm font-bold text-gray-500 '>{commentCount}</p>
    </div>
  );
}

export default ContentInteractions;
