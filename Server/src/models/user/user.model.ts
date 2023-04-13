import mongoose from "mongoose";

export type userTypes = {
  name: string;
  email: string;
  password: string;
  isAvatarImageSet: Boolean;
  avatarImage: string;
};

export type userUpdateTypes = {
  name: string;
  email: string;
  password: string;
  isAvatarImageSet: Boolean;
  avatarImage: string;
};

const userSchema = new mongoose.Schema<userTypes>(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAvatarImageSet: {
      type: Boolean,
      default: false,
    },
    avatarImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("Users", userSchema);
export default userModel;
