import { onError } from "apollo-link-error"
import { ApolloClient } from "apollo-client"
import { ApolloLink, split } from "apollo-link"
import { withClientState } from "apollo-link-state"
import { createHttpLink } from "apollo-link-http"
import { setContext } from "apollo-link-context"
import { InMemoryCache } from "apollo-cache-inmemory"
import { getMainDefinition } from "apollo-utilities"
import { WebSocketLink } from "apollo-link-ws"

let apolloClient = null

const buildAuthState = csrfToken => ({
  authStatus: {
    __typename: "authStatus",
    id: "authValue",
    csrfToken,
    isLoggedIn: csrfToken != null
  }
})

const appCache = new InMemoryCache()

const setCSRFToken = csrfToken => {
  appCache.writeData({ data: buildAuthState(csrfToken) })
  if (!csrfToken) {
    localStorage.removeItem("token")
  } else {
    localStorage.setItem("token", csrfToken)
  }
}

const authorizedFetch = (uri, options) => {
  // get the authentication token from local storage if it exists local storage
  const token = localStorage.getItem("token")

  // return the headers to the context so httpLink can read them
  const headers = {
    ...options.headers,
    Authorization: token ? `Bearer ${token}` : ""
  }

  return fetch(uri, {
    ...options,
    headers
  })
}

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql",
  credentials: "include",
  fetch: authorizedFetch
})

const wsLink = new WebSocketLink({
  uri: `ws://localhost:8080/graphql`,
  options: {
    reconnect: true
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    )
  },
  wsLink,
  httpLink
)

const stateLink = withClientState({
  cache: appCache,
  // set default state, else you'll get errors when trying to access undefined state
  defaults: buildAuthState(localStorage.getItem("token"))
})

const authLink = new ApolloLink((operation, forward) => {
  const responses = forward(operation)

  return responses.filter(response => {
    // Handle log in/sign up responses
    const data = response.data || {}
    const { csrfToken } = data.login || data.signup || {}
    if (csrfToken != null) {
      setCSRFToken(csrfToken)
      console.log("logged in")
      // apolloClient.queryManager.broadcastQueries()
    }
    if (data.logout) {
      setCSRFToken(null)
      console.log("logged out")
    }
    // Handle auth errors and filter them out of responses
    if (response.errors == null) {
      return true
    }
    const authError = response.errors.some(
      err => err.extensions.code === "UNAUTHENTICATED"
    )
    if (authError) {
      console.log("unauthenticated")
      setCSRFToken(null)
      // apolloClient.queryManager.broadcastQueries()
    }
    return !authError
  })
})

apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, authLink, stateLink, link]),
  cache: appCache
})

export default apolloClient
