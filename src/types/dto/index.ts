type CreatePostDto = {
  title: string;
  body: string;
  author: string;
};

type CreateCommunityDto = {
  name: string;
  description: string;
};

export type { CreateCommunityDto, CreatePostDto };
