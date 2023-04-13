export const statusCode = {
  OK: "200",
  CREATED: "201",
  FAILED: "400",
};

const Response = {
  TWILIO_CODE_SENT: {
    message: "Code has been sent successfully",
    status: statusCode.OK,
  },
  TWILIO_CODE_VERIFIED: {
    message: "Code has been verified successfully",
    status: statusCode.OK,
  },
  USER_REGISTERED: {
    message: "User has been registered successfully",
    status: statusCode.CREATED,
  },
  USER_PROFILE_UPDATED: {
    message: "User profile has been updated",
    status: statusCode.OK,
  },
  NOTE_ADDED: {
    message: "A note has been added successfully",
    status: statusCode.CREATED,
  },
  COMMENT_ADDED: {
    message: "A comment has been added successfully",
    status: statusCode.CREATED,
  },
  COMMENT_REACTED: {
    message: "A comment reacted successfully",
    status: statusCode.CREATED,
  },
  FAVORITE_ADDED: {
    message: "A media has been added to your favorite lists successfully",
    status: statusCode.CREATED,
  },
};

export default Response;
