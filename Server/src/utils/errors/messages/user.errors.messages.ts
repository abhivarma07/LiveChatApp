import { statusCode } from "../../response/index.response.utils";

const userErrorMessages = {
  EMAIL_ALREADY_EXISTS: {
    message: "Email already exists",
    statusCode: statusCode.FAILED,
  },
  USER_NOT_FOUND: {
    message: "No user found",
    statusCode: statusCode.FAILED,
  },
  USER_REGISTRATION_FAILED: {
    message: "Failed to register user",
    statusCode: statusCode.FAILED,
  },
  USER_PROFILE_UPDATE_FAILED: {
    message: "Failed to update user profile",
    statusCode: statusCode.FAILED,
  },
  UN_AUTHORIZED: {
    message: "Authorization failed",
    statusCode: statusCode.FAILED,
  },
  ACCESS_TOKEN_EXPIRED: {
    message: "Access token expired",
    statusCode: statusCode.FAILED,
  },
};

export default userErrorMessages;
