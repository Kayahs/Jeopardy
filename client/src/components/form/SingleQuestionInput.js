import React from "react"

import { FormContext } from "lib"
import { QuestionInput, AnswerInput } from "components"

const SingleQuestionInput = props => (
  <FormContext.Consumer>
    {data => (
      <div>
        <QuestionInput {...props} />
        <AnswerInput {...props} />
      </div>
    )}
  </FormContext.Consumer>
)

export default SingleQuestionInput
