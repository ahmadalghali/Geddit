import { UserDTO } from "@/types/dtos";

type Community = {
  name: string;
  description: string;
  imageUrl?: string;
  createdBy: UserDTO;
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

export type { Community, Post, Comment };
