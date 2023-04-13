import { composeResolvers } from "@graphql-tools/resolvers-composition";
import chatModel from "../../models/chats/chats.model";
import userModel from "../../models/user/user.model";
import { isAuthenticated } from "../../helper/token.helper";

const resolvers = {
  Query: {
    userChats: async (_, args, { user }) => {
      const { userId } = args;
      try {
        const chat = await chatModel.find({
          members: { $in: [userId] },
        });

        console.log(chat);

        return {
          status: "200",
          results: chat,
        };
      } catch (err) {
        console.log(err);
      }
    },
    findChats: async (_, args, { user }) => {
      const { firstId, secondId } = args;
      try {
        const chat = await chatModel.find({
          members: { $all: [firstId, secondId] },
        });

        console.log(chat);

        return {
          status: "200",
          results: chat,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createChatByEmail: async (_, args, { user }) => {
      const { email } = args;
      try {
        const reciver = await userModel.findOne({ email: email });

        console.log(reciver.name, user.name);

        if (!reciver) {
          return new Error("User not found");
        }

        const newChat = await new chatModel({
          members: [user._id, reciver._id],
        }).save();

        let result = {
          status: "201",
          members: newChat.members,
          _id: newChat._id,
        };

        console.log(result);
        return {
          ...result,
        };
      } catch (err) {
        console.log(err);
      }
    },
    createChat: async (_, args, { user }) => {
      const { senderId, reciverId } = args;
      try {
        const newChat = await new chatModel({
          members: [senderId, reciverId],
        }).save();

        let result = {
          status: "201",
          members: newChat.members,
          _id: newChat._id,
        };

        console.log(result);
        return {
          ...result,
        };
      } catch (err) {
        console.log(err);
      }
    },
  },
};

const resolversComposition = {
  "Mutation.createChatByEmail": isAuthenticated(),
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export default composedResolvers;
