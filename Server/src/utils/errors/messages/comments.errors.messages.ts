import { statusCode } from "../../response/index.response.utils";

const commentErrorMessages = {
  FAILED_TO_ADD_COMMENT: {
    message: "Failed to add a comment",
    statusCode: statusCode.FAILED,
  },
  FAILED_TO_REACT_ON_COMMENT: {
    message: "Failed to react on a comment",
    statusCode: statusCode.FAILED,
  },
};

export default commentErrorMessages;
