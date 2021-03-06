import React from "react"
import { FormContext } from "lib/contexts"

const SubmitButton = () => (
  <FormContext.Consumer>
    {data => (
      <button type="submit" disabled={data.isSubmitting}>
        Submit
      </button>
    )}
  </FormContext.Consumer>
)

export default SubmitButton
