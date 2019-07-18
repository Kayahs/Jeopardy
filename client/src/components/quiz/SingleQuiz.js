import React from "react"

import { CategoryList } from "components"

const SingleQuiz = ({ quiz }) => (
  <li>
    <h1>{quiz.title}</h1>
    <h2>Created by: {quiz.owner.fullname}</h2>
    <CategoryList categories={quiz.categories} />
  </li>
)

export default SingleQuiz
