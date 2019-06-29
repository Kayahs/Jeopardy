import gql from "graphql-tag"

export const GET_AUTH_STATUS = gql`
  query {
    authStatus @client {
      isLoggedIn
    }
  }
`
