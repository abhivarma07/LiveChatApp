import { gql } from "@apollo/client";

export const GET_USER_CHATS = gql`
  query userChats($userId: String!) {
    userChats(userId: $userId) {
      status
      results {
        _id
        members
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessages($chatId: String!) {
    getMessages(chatId: $chatId) {
      results {
        _id
        chatId
        senderId
        text
      }
      status
    }
  }
`;
