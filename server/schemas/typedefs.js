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
    username: String!
    email: String!
    gender: String!
    dateOfBirth: String!
    phone: String!
    profileImage: String
    posts: [Post!]
  }

  type Post {
    _id: ID!
    userId: User
    postMessage: String!
    postImage: String
    postVideo: String
    createdAt: String
    updatedat: String
  }

  type PostsType {
    _id: ID!
    postMessage: String!
    postImage: String
    postVideo: String
    userId: User
    createdAt: String
    updatedat: String
  }

  type UserDetailsType {
    userId: ID!
    gamingName: String!
    userRole: String!
    location: String!
    playingPreference: String!
  }

  input GameDetailsInput {
    race: RaceSchemaInput
    selectedClass: RaceSchemaInput
    userId: ID!
  }
  type GameDetails {
    race: RaceSchema
    selectedClass: RaceSchema
    userId: ID!
  }

  type Query {
    users: [User!]
    user(username: String!): User
    posts(userId: String): [PostsType!]
    userDetails(username: String!): UserDetailsType
    gameDetails(username: String!): GameDetails
  }

  input RegisterInput {
    first_name: String!
    last_name: String!
    username: String!
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

  input RaceSchemaInput {
    index: String!
    name: String!
    url: String!
  }

  type RaceSchema {
    index: String!
    name: String!
    url: String!
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
    addGameDetails(input: GameDetailsInput!): GameDetails
  }
`;

module.exports = typeDefs;
