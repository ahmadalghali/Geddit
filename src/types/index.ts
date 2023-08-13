type Community = {
  name: string;
  description: string;
};

type Post = {
  id: string;
  title: string;
  community: Community;
  body: string;
};

type Comment = {
  id: string;
  text: string;
  comments: Comment[];
};

type VoteState = "UPVOTED" | "DOWNVOTED";

export type { Community, Post, Comment, VoteState };
