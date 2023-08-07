import { CommentDTO } from "../types/dto";
import Comment from "./Comment";

type Props = {
  comments: CommentDTO[];
  isChild: boolean;
};

function CommentsList({ comments }: Props) {
  return (
    <ul className='space-y-10 bg-white'>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} isChild={false} />
        </li>
      ))}
    </ul>
  );
}

export default CommentsList;
