import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import express, { Response, Request } from "express";
import resolvers from "../resolvers/index.app.resolvers";
import typeDefs from "../schema/index.schema";
import { expressMiddleware } from "@apollo/server/express4";
import { getErrorCode } from "../utils/errors/index.errors";
import { GraphQLError, GraphQLFormattedError } from "graphql/error";

const appRoutes = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  formatError: (formattedError, error) => {
    // console.log(err);
    // return err;

    // const { message, GraphQLFormattedError } = getErrorCode(err.message);

    console.log("formattedError", formattedError, error);
    return formattedError;
    // const { message = "", statusCode = "" } = getErrorCode(err.message);
    // if (message && statusCode) {
    //   return {
    //     message: message,
    //     statusCode: statusCode,
    //   };
    // } else {
    //   return err;
    // }
  },
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

const initializeAppRoutes = async () => {
  // Note you must call `server.start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start();

  appRoutes.use(
    "/",
    expressMiddleware(server, {
      context: async ({ req, res }: { req: Request; res: Response }) => {
        return {
          headers: req.headers,
          user: null,
        };
      },
    })
  );
};

export { initializeAppRoutes, appRoutes };
