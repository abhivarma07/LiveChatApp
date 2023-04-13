const typeDefs = /* GraphQL */ `
  type Response {
    message: String
    status: String
  }

  type User {
    _id: String
    name: String
    email: String
    password: String
    isAvatarImageSet: Boolean
    avatarImage: String
  }

  type Register {
    message: String
    status: String
    access_token: String
    user: User
  }

  type Avatar {
    message: String
    status: String
    user: User
  }

  type Query {
    getUserByID(userID: String!): User
    user: User
    login(email: String!, password: String!): Register
  }

  type Mutation {
    register(name: String, email: String, password: String): Register
    setAvatar(avatar: String!): Avatar
    update(name: String, email: String, password: String): Response
  }
`;

export default typeDefs;
