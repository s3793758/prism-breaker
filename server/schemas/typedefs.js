const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Upload

  type File {
    filePath: String!
  }
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    dateOfBirth: String!
    phone: String!
    profileImage: String
    posts: [Post!]
  }

 

  input RegisterInput {
    first_name: String!
    last_name: String!
    email: String!
    password: String!
    gender: String!
    dateOfBirth: String!
    phone: String!
  }

  input UserDetailsInput {
    userId: ID!
    gamingName: String!
    userRole: String!
    location: String!
    playingPreference: String!
  }

  type Mutation {
    login(email: String!, password: String!): User
    register(input: RegisterInput!): User
    uploadProfileImage(image: String!, userId: ID!): User
    addPost(
      postMessage: String!
      postImage: String
      postVideo: String
      userId: ID!
    ): Post
    deletePost(postId: ID!, userId: ID!): Post
    singleUpload(file: Upload!, userId: ID!, postId: ID!): File!
    addUserDetails(input: UserDetailsInput!): UserDetailsType
  }
`;

module.exports = typeDefs;
