import React from "react"

import { FormContext } from "lib"

const AnswerInput = ({ catIndex, index }) => (
  <FormContext.Consumer>
    {data => {
      const handleChange = event => {
        data.setFieldValue(
          `categories[${catIndex}].questions[${index}].answer`,
          event.target.value
        )
      }
      const handleBlur = event => {
        data.setFieldTouched(
          `categories[${catIndex}].questions[${index}].answer`
        )
      }
      return (
        <div>
          {data.labels.answer}
          <input
            type="text"
            name="answer"
            value={data.values.categories[catIndex].questions[index].answer}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      )
    }}
  </FormContext.Consumer>
)

export default AnswerInput
