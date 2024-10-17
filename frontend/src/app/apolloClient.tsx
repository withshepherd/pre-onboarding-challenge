"use client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { ReactNode } from "react";

const client = new ApolloClient({
  uri: "http://0.0.0.0:8001/api/graphql",

  cache: new InMemoryCache(),
});

const GqlProvider = ({ children }: { children: ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
export default GqlProvider;
