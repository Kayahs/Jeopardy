import React from "react"

import { SingleQuiz } from "components"

const QuizList = ({ data }) => {
  if (!data) {
    return <div>No Quizzes yet.</div>
  }
  return (
    <ul>
      {data.map(quiz => (
        <SingleQuiz key={`quiz-${quiz.id}`} quiz={quiz} />
      ))}
    </ul>
  )
}

export default QuizList
