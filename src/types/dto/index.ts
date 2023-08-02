type CreatePostDto = {
  title: string;
  body: string;
  author: string;
};

type CreateCommunityDto = {
  name: string;
  description: string;
};

type CreateUserDto = {
  username: string;
  password: string;
};
export type { CreateCommunityDto, CreatePostDto, CreateUserDto };
