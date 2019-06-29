import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom"
import { useQuery } from "react-apollo-hooks"

import { GET_AUTH_STATUS } from "gql/queries"
import Loading from "components/util/Loading"
const MainRouter = () => {
  const { loading, error, data } = useQuery(GET_AUTH_STATUS)
  if (loading) return <Loading />
  if (error) {
    throw error
  }
  console.log("test", data)
  return (
    <Router>
      <Switch />
    </Router>
  )
}

export default MainRouter
