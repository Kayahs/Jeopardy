const { gql } = require("apollo-server-express")

module.exports = gql`
  type Query {
    message: String!
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
  }

  type User {
    fullname: String
    email: String!
    password: String!
  }

  input NewUserInput {
    fullname: String
    email: String!
    password: String!
  }

  type LoginResponse {
    csrfToken: String
    user: User!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`
