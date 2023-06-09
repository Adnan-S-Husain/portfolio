import * as dotenv from "dotenv";
import neo4j from "neo4j-driver";
import { Neo4jGraphQL } from "@neo4j/graphql";
import { typeDefs } from "./schema";
import { signInResolver } from "./resolvers/mutation/mutation";
import { Neo4jGraphQLAuthJWTPlugin } from "@neo4j/graphql-plugin-auth";

dotenv.config();

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const neoSchema = new Neo4jGraphQL({
  typeDefs,
  driver,
  resolvers: {
    Mutation: {
      signIn: signInResolver,
    },
  },
  plugins: {
    auth: new Neo4jGraphQLAuthJWTPlugin({
      secret: process.env.NEO4J_SECRET,
    }),
  },
});

export const schema = neoSchema.getSchema();
