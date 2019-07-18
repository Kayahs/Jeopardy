import React from "react"
import { ApolloProvider } from "react-apollo"
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"

import { MainRouter } from "components"
import { apolloClient } from "config"

const AppContainer = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <ApolloHooksProvider client={apolloClient}>
        <MainRouter />
      </ApolloHooksProvider>
    </ApolloProvider>
  )
}

export default AppContainer
