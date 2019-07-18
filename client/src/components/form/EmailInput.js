import React from "react"
import { FormContext } from "lib"
import { ErrorText } from "components"

const EmailInput = () => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.labels.email}
        <input
          type="email"
          name="email"
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          value={data.values.email}
        />
        {data.touched.email && data.errors.email && (
          <ErrorText msg={data.errors.email} />
        )}
      </div>
    )}
  </FormContext.Consumer>
)

export default EmailInput
