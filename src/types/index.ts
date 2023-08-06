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
export type { Community, Post };
