import SchemaBuilder from "@pothos/core";
import { createYoga } from "graphql-yoga";

import { GraphQLDate, GraphQLDateTime } from "graphql-scalars";
import { Prisma, PrismaClient, User } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import prisma from "./prisma";
import { createUser, CreateUserArgs, getUsers } from "./lib/user";

//Shared context that is injected into every rejquest
export interface AppContext {
  prisma: PrismaClient;
}

export interface SchemaTypes {
  Scalars: {
    JSON: {
      Input: Prisma.JsonValue;
      Output: Prisma.JsonValue;
    };
    JSONObject: {
      Input: Prisma.JsonValue;
      Output: Prisma.JsonValue;
    };
    Date: {
      Input: Date;
      Output: Date;
    };
    DateTime: {
      Input: string;
      Output: Date;
    };
    ID: {
      Input: string;
      Output: string;
    };
  };
  Context: AppContext;
}
export type TypesWithDefaults =
  PothosSchemaTypes.ExtendDefaultTypes<SchemaTypes>;

const builder = new SchemaBuilder<TypesWithDefaults>({});

// Register useful types
builder.addScalarType("DateTime", GraphQLDateTime, {});
builder.addScalarType("Date", GraphQLDate, {});

// Add top level query and mutaiton
builder.queryType({ description: "Query root" });
builder.mutationType({ description: "Mutation root" });

//Expose User Object to graphql
const UserObject = builder.objectRef<User>("User").implement({
  fields: (t) => ({
    id: t.exposeID("id"),
    name: t.exposeString("name"),
    email: t.exposeString("email"),
  }),
});

//Expose users query
builder.queryField("users", (t) =>
  t.field({
    type: [UserObject],
    nullable: false,
    resolve: (_parent, _args, context) => getUsers(context),
  })
);

//Expose create user args
const CreateUserInput = builder
  .inputRef<CreateUserArgs>("CreateUserInput")
  .implement({
    fields: (t) => ({
      name: t.string({ required: true }),
      email: t.string({ required: true }),
    }),
  });

//Expose create user mutation
builder.mutationField("createUser", (t) =>
  t.field({
    type: UserObject,
    nullable: false,
    args: {
      input: t.arg({
        type: CreateUserInput,
        required: true,
      }),
    },
    resolve: (_parent, args, context) => createUser(args.input, context),
  })
);

/**
 * Builds GraphQL Schema and creates request handler
 */
export const getServer = () => {
  const builderSchema = builder.toSchema({});

  return createYoga<{
    req: FastifyRequest;
    reply: FastifyReply;
  }>({
    graphqlEndpoint: "/api/graphql",
    schema: builderSchema,
    maskedErrors: false,
    context: async () => {
      //Pass prisma client to request context
      const context: AppContext = {
        prisma,
      };

      return context;
    },
  });
};
