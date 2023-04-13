import errorMessages from "./messages/index.errors.messages";
import errorNames from "./names/index.errors.names";

type P = {
  message: string;
  statusCode: string;
};

export const getErrorCode = (errorName: string): P => {
  return errorMessages[errorName];
};

export { errorNames, errorMessages };
