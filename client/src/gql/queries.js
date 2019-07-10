import gql from "graphql-tag"

export const GET_AUTH_STATUS = gql`
  query {
    authStatus {
      isLoggedIn
    }
  }
`
export const GET_QUIZZES = gql`
  query {
    getQuizzes {
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
`
