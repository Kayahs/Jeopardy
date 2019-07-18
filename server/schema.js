const { gql } = require("apollo-server-express")

module.exports = gql`
  type Query {
    getQuizzes: [Quiz]
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    createQuiz(input: NewQuizInput!): NewQuizResponse!
    logout: Boolean
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
    id: ID!
    title: String
    owner: User
    categories: [Category]
  }

  type Category {
    id: ID
    name: String
    questions: [Question]
  }

  type Question {
    question: String
    answer: String
    points: Int
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

  type NewCategoryResponse {
    error: Error
    category: Category
  }

  type NewQuestionResponse {
    error: Error
    question: Question
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
    categories: [NewCategoryInput]!
  }

  input NewCategoryInput {
    name: String!
    questions: [NewQuestionInput]!
  }

  input NewQuestionInput {
    question: String!
    answer: String!
    points: Int!
  }
`
