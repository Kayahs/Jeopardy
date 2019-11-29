import React from "react"

import { FormContext } from "lib"
import { ErrorText } from "components"
const QuizTitle = () => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.labels.title}
        <input
          name="title"
          value={data.values.title}
          onChange={data.handleChange}
          onBlur={data.handleBlur}
        />
        {data.touched.title && data.errors.title && (
          <ErrorText msg={data.errors.title} />
        )}
      </div>
    )}
  </FormContext.Consumer>
)

export default QuizTitle
