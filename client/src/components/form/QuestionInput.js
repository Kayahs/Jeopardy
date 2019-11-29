import React from "react"

import { FormContext } from "lib"
import { ErrorText } from "components"

const QuestionInput = ({ catIndex, index }) => (
  <FormContext.Consumer>
    {data => {
      const handleChange = event => {
        data.setFieldValue(
          `categories[${catIndex}].questions[${index}].question`,
          event.target.value
        )
      }
      const handleBlur = event => {
        data.setFieldTouched(
          `categories[${catIndex}].questions[${index}].question`
        )
      }
      return (
        <div>
          {data.labels.question}
          <input
            type="text"
            name="question"
            value={data.values.categories[catIndex].questions[index].question}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {
            //data.touched.categories[catIndex].questions[index].question &&
            //data.errors.categories[catIndex].questions[index].question && (
            // <ErrorText
            //  msg={data.errors.categories[catIndex].questions[index].question}
            ///>
            //)
          }
        </div>
      )
    }}
  </FormContext.Consumer>
)

export default QuestionInput
