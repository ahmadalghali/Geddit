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

type UserRegisterRequestDTO = {
  username: string;
  password: string;
};

type UserDTO = {
  id: string;
  username: string;
};

export type { CreateCommunityDto, CreatePostDto, PostDto, UserRegisterRequestDTO, UserDTO };
