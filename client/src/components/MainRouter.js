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
import Login from "components/auth/Login"
import SignUp from "components/auth/SignUp"
import Dashboard from "components/dashboard/Dashboard"
import BrowseQuizzes from "components/quiz/BrowseQuizzes"

const MainRouter = () => {
  const { loading, error, data } = useQuery(GET_AUTH_STATUS)
  if (loading) return <Loading />
  if (error) {
    throw error
  }
  const { isLoggedIn } = data.authStatus
  return (
    <Router>
      {!isLoggedIn && (
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/sign-up" exact component={SignUp} />
          <Redirect to="/" />
        </Switch>
      )}
      {isLoggedIn && (
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/browse" exact component={BrowseQuizzes} />
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  )
}

export default MainRouter
