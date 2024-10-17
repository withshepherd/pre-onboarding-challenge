import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      [`http://0.0.0.0:8001/api/graphql`]: {
        headers: {
          "x-app-introspect-auth": process.env.INTROSPECTION_TOKEN || "",
        },
      },
    },
  ],
  documents: ["src/**/*.graphql", "!*.generated.graphql"],
  generates: {
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "src/graphql/types.generated.ts": {
      plugins: ["typescript"],
      config: {
        allowEnumStringTypes: true,
        scalars: {
          EmailAddress: "string",
          Option: "string | number",
          SafeInt: "number",
          Date: "string",
          DateTime: "string",
          UploadFile: "any",
          MoneyFloat: "number",
        },
      },
    },
    "src/graphql/namedOperations.generated.ts": {
      plugins: ["named-operations-object"],
    },
    "src/graphql/possibleTypes.generated.json": {
      plugins: ["fragment-matcher"],
    },
    "src/graphql/apolloHelpers.generated.ts": {
      plugins: ["typescript-apollo-client-helpers"],
    },
    "src/": {
      preset: "near-operation-file",
      presetConfig: {
        baseTypesPath: "../src/graphql/types.generated.ts",
        extension: ".generated.ts",
      },
      plugins: ["typescript-operations", "typescript-react-apollo"],
      config: {
        pureMagicComment: true,
        useTypeImports: true,
        documentMode: "graphQLTag",
        exportFragmentSpreadSubTypes: true,
        reactApolloVersion: 3,
        documentVariableSuffix: "",
        withHooks: true,
        withHOC: false,
        scalars: {
          EmailAddress: "string",
          Option: "string | number",
          SafeInt: "number",
          Date: "string",
          DateTime: "string",
          UploadFile: "any",
          MoneyFloat: "number",
        },
      },
    },
  },
};

export default config;
