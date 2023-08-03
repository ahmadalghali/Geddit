type CreatePostDto = {
  title: string;
  body: string;
  author: string;
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

export type {
  CreateCommunityDto,
  CreatePostDto,
  UserRegisterRequestDTO,
  UserDTO,
};
