type CreatePostDTO = {
  title: string;
  body?: string;
  author: string;
};

type CreateCommentDTO = {
  text: string;
  author: string;
};

type CreateCommunityDTO = {
  name: string;
  description: string;
};

type CommentDTO = {
  id: string;
  text: string;
  author: string;
  postId: string;
  replies: CommentDTO[];
};

type PostDTO = {
  id: string;
  title: string;
  body?: string;
  communityName: string;
  comments: CommentDTO[];
};

type CommunityDTO = {
  name: string;
  description: string;
  posts: PostDTO[];
};

type PostSummaryDTO = {
  id: string;
  title: string;
  body?: string;
  communityName: string;
  commentCount: number;
  upvotes: number;
  downvotes: number;
};

type UserRegisterRequestDTO = {
  username: string;
  password: string;
};

type UserDTO = {
  id: string;
  username: string;
};

export type {
  CreateCommunityDTO,
  CreatePostDTO,
  CreateCommentDTO,
  CommunityDTO,
  CommentDTO,
  PostDTO,
  PostSummaryDTO,
  UserRegisterRequestDTO,
  UserDTO,
};
