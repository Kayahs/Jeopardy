import React from "react"

import { FormContext } from "lib"
import { CategoryName, QuestionInputSection } from "components"

const SingleCategoryInput = ({ index }) => (
  <div>
    <CategoryName index={index} />
    <QuestionInputSection catIndex={index} />
  </div>
)

export default SingleCategoryInput
