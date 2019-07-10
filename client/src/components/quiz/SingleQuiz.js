import React from "react"

import CategoryList from "components/category/CategoryList"

const SingleQuiz = ({ quiz }) => (
  <div>
    <h1>{quiz.title}</h1>
    <h2>Created by: {quiz.owner.fullname}</h2>
    <CategoryList categories={quiz.categories} />
  </div>
)

export default SingleQuiz
