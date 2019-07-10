import React from "react"
import { Link } from "react-router-dom"

import Logout from "components/auth/Logout"

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to="/browse">Browse Quizzes</Link>
      <Logout />
    </div>
  )
}

export default Dashboard
