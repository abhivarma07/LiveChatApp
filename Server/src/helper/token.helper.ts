import jwt from "jsonwebtoken";
import "dotenv/config";
import { findUserById } from "../models/user/user.model.helper";
import { errorNames } from "../utils/errors/index.errors";

const secret_key = process.env.JWT_SECRET_KEY;

const createAccessToken = async (userID: any) => {
  // creating access token

  const access_token = jwt.sign(
    {
      userID: userID,
    },
    secret_key,
    {
      algorithm: "HS256",
      // expiresIn: 3600,
    }
  );
  return access_token;
};

const verifyToken = async (context: any) => {
  const { authorization } = context.headers;

  if (!authorization) {
    return new Error(errorNames.UN_AUTHORIZED);
  }
  // get bearer token
  const token = authorization.replace("Bearer ", "");

  try {
    // decode token
    const decode = await jwt.verify(token, secret_key);

    const { userID } = <any>decode;

    // find user
    const user = await findUserById(userID);

    if (!user) {
      return new Error(errorNames.USER_NOT_FOUND);
    }

    return user;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return new Error(errorNames.ACCESS_TOKEN_EXPIRED);
    }
    return new Error(errorNames.UN_AUTHORIZED);
  }
};

const isAuthenticated = () => (next) => async (root, args, context, info) => {
  const value = await verifyToken(context);

  if (value instanceof Error) {
    return new Error(value.message);
  } else {
    // add user to context
    context.user = value;
    return next(root, args, context, info);
  }
};

export { createAccessToken, isAuthenticated };
