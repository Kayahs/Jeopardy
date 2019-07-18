import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom"
import { useQuery } from "react-apollo-hooks"

import { GET_AUTH_STATUS } from "gql"
import {
  Login,
  SignUp,
  Dashboard,
  BrowseQuizzes,
  CreateQuiz,
  Loading
} from "components"

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
          <Route path="/create-new-quiz" exact component={CreateQuiz} />
          <Redirect to="/" />
        </Switch>
      )}
    </Router>
  )
}

export default MainRouter
