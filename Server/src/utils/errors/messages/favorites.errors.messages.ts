import { statusCode } from "../../response/index.response.utils";

const favoriteErrorMessages = {
  FAILED_TO_ADD_MEDIA_IN_FAVORITE_LIST: {
    message: "Failed to add media as favorite",
    statusCode: statusCode.FAILED,
  },
};

export default favoriteErrorMessages;
