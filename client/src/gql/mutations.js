import gql from "graphql-tag"

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      error {
        code
        message
      }
      csrfToken
    }
  }
`

export const SIGNUP_MUTATION = gql`
  mutation signupMutation($input: NewUserInput!) {
    signup(input: $input) {
      error {
        code
        message
      }
      csrfToken
    }
  }
`

export const LOGOUT_MUTATION = gql`
  mutation logoutMutation {
    logout
  }
`
export const ADD_QUIZ_MUTATION = gql`
  mutation addQuizMutation($input: NewQuizInput!) {
    createQuiz(input: $input) {
      error {
        code
        message
      }
      quiz {
        id
        title
        owner {
          id
          fullname
          email
        }
        categories {
          id
          name
        }
      }
    }
  }
`
