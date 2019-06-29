import React from "react"
import { ApolloProvider } from "react-apollo"

import MainRouter from "components/MainRouter"
import apolloClient from "config/apolloClient"

const AppContainer = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <MainRouter />
    </ApolloProvider>
  )
}

export default AppContainer
