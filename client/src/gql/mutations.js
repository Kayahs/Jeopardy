import gql from "graphql-tag"

export const LOGIN_MUTATION = gql`
  mutation loginMutation($input: LoginInput!) {
    login(input: $input) {
      csrfToken
    }
  }
`
