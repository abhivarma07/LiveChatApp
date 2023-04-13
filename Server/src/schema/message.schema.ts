const typeDefs = /* GraphQL */ `
  type messageResponse {
    chatId: String
    senderId: String
    text: String
    _id: String
  }

  type userMessages {
    status: String
    results: [messageResponse]
  }

  type createMessage {
    chatId: String
    senderId: String
    text: String
    status: String
    _id: String
  }

  type Query {
    getMessages(chatId: String!): userMessages
  }

  type Mutation {
    addMessage(chatId: String!, senderId: String!, text: String!): createMessage
  }
`;

export default typeDefs;
