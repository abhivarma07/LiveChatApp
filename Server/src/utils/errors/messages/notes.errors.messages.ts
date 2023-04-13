import { statusCode } from "../../response/index.response.utils";

const notesErrorMessages = {
  FAILED_TO_ADD_NOTE: {
    message: "Failed to add a note",
    statusCode: statusCode.FAILED,
  },
};

export default notesErrorMessages;
