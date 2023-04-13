import commentErrorNames from "./comments.errors.names";
import favoriteErrorNames from "./favorites.errors.names";
import notesErrorNames from "./notes.errors.names";
import userErrorNames from "./user.errors.names";

const errorNames = {
  OTP_FAILED: "OTP_FAILED",
  OTP_VERIFICATION_FAILED: "OTP_VERIFICATION_FAILED",
  FAILED_TO_CONNECT_DATABASE: "FAILED_TO_CONNECT_DATABASE",

  ...userErrorNames,

  ...notesErrorNames,

  ...commentErrorNames,

  ...favoriteErrorNames,
};

export default errorNames;
