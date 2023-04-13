import mongoose from "mongoose";

export type MessageTypes = {
  chatId: string;
  senderId: string;
  text: string;
};

const MessageSchema = new mongoose.Schema<MessageTypes>(
  {
    chatId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
