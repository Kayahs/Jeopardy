import React from "react"
import { useQuery } from "react-apollo-hooks"

import { GET_QUIZZES } from "gql"
import { Loading, QuizList } from "components"

const BrowseQuizzes = () => {
  const { loading, error, data } = useQuery(GET_QUIZZES)
  if (loading) return <Loading />
  if (error) {
    throw error
  }
  return <QuizList data={data.getQuizzes} />
}

export default BrowseQuizzes
