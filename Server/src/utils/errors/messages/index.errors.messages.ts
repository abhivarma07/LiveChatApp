import { statusCode } from "../../response/index.response.utils";
import commentErrorMessages from "./comments.errors.messages";
import favoriteErrorMessages from "./favorites.errors.messages";
import notesErrorMessages from "./notes.errors.messages";
import userErrorMessages from "./user.errors.messages";

const errorMessages = {
  OTP_FAILED: {
    message: "Failed to send OTP",
    statusCode: statusCode.FAILED,
  },
  OTP_VERIFICATION_FAILED: {
    message: "Failed to verify OTP",
    statusCode: statusCode.FAILED,
  },
  FAILED_TO_CONNECT_DATABASE: {
    message: "Failed to connect to database",
    statusCode: statusCode.FAILED,
  },

  ...userErrorMessages,

  ...notesErrorMessages,

  ...commentErrorMessages,

  ...favoriteErrorMessages,
};

export default errorMessages;
