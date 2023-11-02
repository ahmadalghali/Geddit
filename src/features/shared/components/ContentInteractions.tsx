import { IconArrowBackUp, IconDots, IconMessageCircle } from "@tabler/icons-react";
import { cn } from "@/lib/utils/classname";
import { ContentVoteStatus } from "@/types/index";
import { ActionIcon } from "@mantine/core";
import ContentVotes from "@/features/shared/components/ContentVotes";

type Props = {
  onUpvote: () => void;
  onDownvote: () => void;
  voteCount: number;
  voteStatus: ContentVoteStatus;
  onOptionsClicked: () => void;
  onReplyClicked?: () => void;
  commentCount?: number;
  className?: string;
  showOptions?: boolean;
  showCommentsCount?: boolean;
  showReplyButton?: boolean;
};

function ContentInteractions({
  onOptionsClicked,
  onReplyClicked,
  onUpvote,
  onDownvote,
  voteCount,
  voteStatus,
  commentCount = 0,
  showOptions = true,
  showCommentsCount = true,
  showReplyButton = false,
  className,
}: Props) {
  // const [voteCount, setVoteCount] = useState(0);
  // const [voteState, setVoteState] = useState<VoteState>();

  return (
    <div className={cn("flex items-center space-x-5", className ?? "")}>
      <ContentVotes
        setVoteCount={() => {}}
        setVoteState={() => {}}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
        voteCount={voteCount}
        voteStatus={voteStatus}
        // setVoteCount={setVoteCount}
        // setVoteState={setVoteState}
      />

      {showCommentsCount && <Comments commentCount={commentCount} />}
      {showReplyButton && (
        <ActionIcon radius={"xl"} onClick={onReplyClicked}>
          <IconArrowBackUp size='24' color='gray' />
        </ActionIcon>
      )}

      {showOptions && (
        <IconDots
          size='36'
          color='gray'
          className='cursor-pointer  p-1.5 rounded-full hover:bg-zinc-100'
          onClick={onOptionsClicked}
        />
      )}
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
