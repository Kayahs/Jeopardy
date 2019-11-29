import React from "react"

import { FormContext } from "lib"
import { SingleQuestionInput } from "components"

const QuestionInputSection = ({ catIndex }) => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.values.categories[catIndex].questions.map((question, index) => (
          <SingleQuestionInput catIndex={catIndex} index={index} />
        ))}
      </div>
    )}
  </FormContext.Consumer>
)

export default QuestionInputSection
