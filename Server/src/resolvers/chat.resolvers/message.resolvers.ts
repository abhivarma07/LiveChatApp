import { composeResolvers } from "@graphql-tools/resolvers-composition";
import MessageModel from "../../models/chats/message.model";

const resolvers = {
  Query: {
    getMessages: async (_, args, { user }) => {
      const { chatId } = args;

      try {
        const res = await MessageModel.find({ chatId });

        return {
          status: "201",
          results: res,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    addMessage: async (_, args, { user }) => {
      const { chatId, senderId, text } = args;

      try {
        const message = new MessageModel({
          chatId,
          senderId,
          text,
        });

        await message.save();

        return {
          status: 201,
          chatId: message.chatId,
          senderId: message.senderId,
          _id: message._id,
          text: message.text,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};

const resolversComposition = {
  //   "Query.user": isAuthenticated(),
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export default composedResolvers;
