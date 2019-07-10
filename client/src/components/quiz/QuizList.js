import React from "react"

import SingleQuiz from "./SingleQuiz"

const QuizList = ({ data }) => {
  if (!data) {
    return <div>No Quizzes yet.</div>
  }
  return (
    <ul>
      {data.map(quiz => (
        <SingleQuiz quiz={quiz} />
      ))}
    </ul>
  )
}

export default QuizList
