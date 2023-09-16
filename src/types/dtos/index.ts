type CreatePostDTO = {
  title: string;
  body?: string;
};

type CreateCommentDTO = {
  text: string;
};

type CreateCommunityDTO = {
  name: string;
  description: string;
};

type CommentDTO = {
  id: string;
  text: string;
  authorUsername: string;
  postId: string;
  replies: CommentDTO[];
  createdDate: string;
};

type PostDTO = {
  id: string;
  title: string;
  body?: string;
  communityName: string;
  comments: CommentDTO[];
  createdDate: string;
  authorUsername: string;
};

type CommunityDTO = {
  name: string;
  description: string;
  posts: PostDTO[];
};

type CommunitySummaryDTO = {
  name: string;
  description: string;
  postCount: number;
};

type PostSummaryDTO = {
  id: string;
  title: string;
  body?: string;
  communityName: string;
  commentCount: number;
  upvotes: number;
  downvotes: number;
  createdDate: string;
  authorUsername: string;
};

type UserRegisterRequestDTO = {
  username: string;
  password: string;
};

type UserSignInRequestDTO = {
  username: string;
  password: string;
};

type UserDTO = {
  id: string;
  username: string;
};

type UpdatePostDTO = {
  body: string;
};

type UpdateCommentDTO = {
  text: string;
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
  CommunitySummaryDTO,
  UserSignInRequestDTO,
  UpdatePostDTO,
  UpdateCommentDTO,
};
