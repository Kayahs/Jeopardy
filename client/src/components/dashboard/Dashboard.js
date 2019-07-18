import React from "react"
import { Link } from "react-router-dom"

import { Logout } from "components"

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to="/browse">Browse Quizzes</Link>
      <Link to="/create-new-quiz">Create New Quiz</Link>
      <Logout />
    </div>
  )
}

export default Dashboard
