import { AppContext } from "../graphql";

export const getUsers = async (context: AppContext) => {
  const users = await context.prisma.user.findMany();

  return users;
};

export type CreateUserArgs = {
  name: string;
  email: string;
};

export const createUser = async (
  { name, email }: CreateUserArgs,
  context: AppContext
) => {
  const user = await context.prisma.user.create({
    data: {
      name,
      email,
    },
  });

  return user;
};
