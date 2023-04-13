const typeDefs = /* GraphQL */ `
  type chatResponse {
    members: [String]
    _id: String
  }

  type userChat {
    status: String
    results: [chatResponse]
  }

  type createChat {
    status: String
    members: [String]
    _id: String
  }

  type Query {
    userChats(userId: String!): userChat
    findChats(firstId: String!, secondId: String!): userChat
  }

  type Mutation {
    createChat(senderId: String!, reciverId: String!): createChat
    createChatByEmail(email: String!): createChat
  }
`;

export default typeDefs;
