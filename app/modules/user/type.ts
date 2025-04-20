export type User = {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
};

export type RegisterUser = Pick<User, "email" | "password">;
export type LoginUser = Pick<User, "email" | "password">;
