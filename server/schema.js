const { gql } = require("apollo-server-express")

module.exports = gql`
  type Query {
    message: String!
  }

  type Mutation {
    signup(input: NewUserInput!): LoginResponse!
    login(input: LoginInput!): LoginResponse!
    createQuiz(input: NewQuizInput!): NewQuizResponse!
    addCategory(input: NewCategoryInput!): NewCategoryResponse!
    addQuestion(input: NewQuestionInput!): NewQuestionResponse!
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
  }

  input NewCategoryInput {
    name: String!
    quiz_id: ID!
  }

  input NewQuestionInput {
    category_id: ID!
    quiz_id: ID!
    question: String!
    answer: String!
    points: Int!
  }
`
