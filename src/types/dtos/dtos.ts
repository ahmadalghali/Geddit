import { ContentVoteStatus } from "@/types";

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
  author: UserDTO;
  postId: string;
  replies: CommentDTO[];
  createdDate: string;
  parentCommentId?: string;
  voteCount: number;
  voteStatus: ContentVoteStatus;
  href: string;
};

type PostDTO = {
  id: string;
  title: string;
  body?: string;
  communityName: string;
  comments: CommentDTO[];
  createdDate: string;
  author: UserDTO;
  voteCount: number;
  voteStatus: ContentVoteStatus;
};

type CommunityDTO = {
  name: string;
  description: string;
  imageUrl?: string;
  posts: PostDTO[];
};

type CommunitySummaryDTO = {
  name: string;
  description: string;
  imageUrl?: string;
  postCount: number;
  memberCount: number;
};

type PostSummaryDTO = {
  id: string;
  title: string;
  body?: string;
  communityName: string;
  commentCount: number;
  createdDate: string;
  voteCount: number;
  author: UserDTO;
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
  profileImageUrl?: string;
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
