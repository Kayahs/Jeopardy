import React from "react"
import { useMutation } from "react-apollo-hooks"

import { LOGOUT_MUTATION } from "gql"

const Logout = () => {
  const logout = useMutation(LOGOUT_MUTATION)
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Logout
