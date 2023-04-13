import { gql } from "@apollo/client";

export const ADD_MESSAGE = gql`
  mutation addMessage($chatId: String!, $senderId: String!, $text: String!) {
    addMessage(chatId: $chatId, senderId: $senderId, text: $text) {
      chatId
      senderId
      status
      text
      _id
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChatByEmail($email: String!) {
    createChatByEmail(email: $email) {
      members
      _id
      status
    }
  }
`;
