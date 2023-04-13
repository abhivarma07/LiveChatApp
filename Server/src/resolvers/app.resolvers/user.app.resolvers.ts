import { composeResolvers } from "@graphql-tools/resolvers-composition";
import { errorNames } from "../../utils/errors/index.errors";
import {
  isUserExist,
  updateUser,
  registerUser,
} from "../../models/user/user.model.helper";
import Response from "../../utils/response/index.response.utils";
import { createAccessToken, isAuthenticated } from "../../helper/token.helper";
import userModel, {
  userTypes,
  userUpdateTypes,
} from "../../models/user/user.model";
import { decryptPassword, encryptPassword } from "../../helper/Bcrypt.helper";
import { GraphQLError } from "graphql";

const resolvers = {
  Query: {
    getUserByID: async (_, args, {}) => {
      const { userID } = args;
      try {
        const user = await userModel.findById(userID);

        return user;
      } catch (err) {
        throw new GraphQLError("Failed to get user");
      }
    },
    user: async (_, args, { user }) => {
      return user;
    },
    login: async (_, args, {}) => {
      try {
        const { email, password } = args;

        const User = await userModel.findOne({ email: email });

        if (!User) {
          return new Error(errorNames.USER_NOT_FOUND);
        }
        const access_token = await createAccessToken(User._id);
        const dPass = await decryptPassword(password, User.password);
        console.log(dPass);
        if (dPass) {
          return {
            message: "Login Successfull",
            status: "201",
            access_token: access_token,
            user: User,
          };
        } else {
          return {
            message: "Bad Password",
            status: "402",
          };
        }
      } catch (err) {
        console.log("Error occured", err);
        return new Error(errorNames.USER_LOGIN_FAILED);
      }
    },
  },
  Mutation: {
    register: async (_, args) => {
      const { name, email, password } = args;

      const _email = email.toLowerCase();

      const _pass = await encryptPassword(password);

      console.log(_email);

      // check if mail already exists
      let isEmailExists: boolean = await isUserExist(_email);

      if (isEmailExists) {
        console.log("Email already exits");
        throw new GraphQLError(errorNames.EMAIL_ALREADY_EXISTS, {
          extensions: {
            code: "BAD_USER_INPUT",
            argumentName: "email",
          },
        });
      }
      try {
        const user = await registerUser({
          name,
          email,
          password: _pass,
          avatarImage: "",
          isAvatarImageSet: false,
        });

        const access_token = await createAccessToken(user._id);

        return {
          access_token: access_token,
          ...Response.USER_REGISTERED,
          user,
        };
      } catch (error) {
        console.log(error);
        return new Error(errorNames.USER_REGISTRATION_FAILED);
      }
    },
    setAvatar: async (_, args, { user }) => {
      const { avatar } = args;
      console.log(user);
      try {
        const filter = { _id: user._id };
        const update = { isAvatarImageSet: true, avatarImage: avatar };

        const updateUser = await userModel.findOneAndUpdate(filter, update);

        const userUpdate = await userModel.findById(user._id);

        console.log(updateUser, userUpdate);

        return {
          status: "201",
          message: "Avatar updated",
          user: {
            name: userUpdate.name,
            isAvatarImageSet: userUpdate.isAvatarImageSet,
            avatarImage: userUpdate.avatarImage,
            email: userUpdate.email,
            _id: userUpdate._id,
          },
        };
      } catch (err) {
        console.log(err);
        return new Error("Error occured while setting avatar");
      }
    },
    update: async (_, args, { user }) => {
      const { name, email, password } = args;

      let data: userUpdateTypes = {
        name,
        email,
        password,
        avatarImage: "",
        isAvatarImageSet: false,
      };

      try {
        await updateUser(user._id, data);

        return Response.USER_PROFILE_UPDATED;
      } catch (error) {
        console.log(error);
        return new Error(errorNames.USER_PROFILE_UPDATE_FAILED);
      }
    },
  },
};

const resolversComposition = {
  "Query.user": isAuthenticated(),
  "Mutation.update": isAuthenticated(),
  "Mutation.setAvatar": isAuthenticated(),
};

const composedResolvers = composeResolvers(resolvers, resolversComposition);

export default composedResolvers;
