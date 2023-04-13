import { mergeResolvers } from "@graphql-tools/merge";
import userResolvers from "./app.resolvers/user.app.resolvers";
import chatResolver from "./chat.resolvers/chat.resolvers";
import messageResolver from "./chat.resolvers/message.resolvers";

const resolvers = mergeResolvers([
  userResolvers,
  chatResolver,
  messageResolver,
]);

export default resolvers;
