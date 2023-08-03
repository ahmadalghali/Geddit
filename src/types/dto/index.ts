type CreatePostDto = {
  title: string;
  body: string;
  author: string;
};

type PostDto = {
  id: string;
  title: string;
  body: string;
  communityName: string;
};

type CreateCommunityDto = {
  name: string;
  description: string;
};

export type { CreateCommunityDto, CreatePostDto, PostDto };
