const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    first_name: String!
    last_name: String!
    email: String!
    gender: String!
    dateOfBirth: String!
    phone: String!
  }

  type Query {
    users: [User!]
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

  type Mutation {
    login(email: String!, password: String!): User
    register(input: RegisterInput!): User
  }
`;

module.exports = typeDefs;
