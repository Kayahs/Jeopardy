const { gql } = require("apollo-server-express")

module.exports = gql`
  type Query {
    message: String!
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    createQuiz(input: NewQuizInput!): NewQuizResponse!
  }

  type User {
    id: ID!
    fullname: String
    email: String!
    password: String!
  }

  type Error {
    code: Int
    message: String
  }

  type Quiz {
    title: String
    owner: User
  }

  type LoginResponse {
    error: Error
    csrfToken: String
    user: User
  }

  type NewQuizResponse {
    error: Error
    quiz: Quiz
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

  input NewQuizInput {
    title: String!
  }
`
