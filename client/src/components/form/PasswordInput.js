import React from "react"
import { FormContext } from "lib"
import { ErrorText } from "components"

const PasswordInput = () => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.labels.password}
        <input
          type="password"
          name="password"
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          value={data.values.password}
        />
        {data.touched.password && data.errors.password && (
          <ErrorText msg={data.errors.password} />
        )}
      </div>
    )}
  </FormContext.Consumer>
)

export default PasswordInput
