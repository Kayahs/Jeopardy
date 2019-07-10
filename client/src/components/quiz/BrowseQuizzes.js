import React from "react"
import { useQuery } from "react-apollo-hooks"

import { GET_QUIZZES } from "gql/queries"
import Loading from "components/util/Loading"
import QuizList from "./QuizList"

const BrowseQuizzes = () => {
  const { loading, error, data } = useQuery(GET_QUIZZES)
  if (loading) return <Loading />
  if (error) {
    throw error
  }
  console.log(data.getQuizzes)
  return <QuizList data={data.getQuizzes} />
}

export default BrowseQuizzes
