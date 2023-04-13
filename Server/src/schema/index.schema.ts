import { mergeTypeDefs } from "@graphql-tools/merge";
import userSchema from "./user.app.schema";
import chatSchema from "./chat.schema";
import messageSchema from "./message.schema";
const typeDefs = mergeTypeDefs([userSchema, chatSchema, messageSchema]);

export default typeDefs;
