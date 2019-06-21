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

  type Error {
    code: Int
    message: String
  }

  type LoginResponse {
    error: Error
    csrfToken: String
    user: User
  }

  input NewUserInput {
    fullname: String
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
`
