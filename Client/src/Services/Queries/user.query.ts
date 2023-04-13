import { gql } from "@apollo/client";

export const LOGIN_QUERY = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      message
      status
      access_token
      user {
        _id
        name
        email
        password
        avatarImage
        isAvatarImageSet
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserByID($userID: String!) {
    getUserByID(userID: $userID) {
      _id
      email
      name
      avatarImage
      isAvatarImageSet
    }
  }
`;
