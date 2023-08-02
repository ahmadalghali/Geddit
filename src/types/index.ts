type Community = {
  id: string;
  name: string;
  description: string;
};

type Post = {
  id: string;
  title: string;
  community: Community;
  author: string;
};

type User = {
  id: string;
  username: string;
  password: string;
};
export type { Community, Post, User };
