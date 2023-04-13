import { gql } from "@apollo/client";

export const REGISTER_MUTATION = gql`
  mutation register($name: String!, $email: String!, $password: String!) {
    register(name: $name, email: $email, password: $password) {
      message
      status
      access_token
      user {
        _id
        name
        email
        password
      }
    }
  }
`;

export const UPDATE_MUTATION = gql`
  mutation update($name: String!, $email: String!, $password: String!) {
    update(name: $name, email: $email, password: $password) {
      message
      status
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation setAvatar($avatar: String!) {
    setAvatar(avatar: $avatar) {
      message
      status
      user {
        _id
        email
        name
        password
        avatarImage
        isAvatarImageSet
      }
    }
  }
`;
