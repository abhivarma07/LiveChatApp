import mongoose from "mongoose";

export type chatTypes = {
  members: [string];
};

const chatSchema = new mongoose.Schema<chatTypes>(
  {
    members: {
      type: [String],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const chatModel = mongoose.model("Chat", chatSchema);
export default chatModel;
