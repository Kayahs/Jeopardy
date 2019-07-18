import React from "react"

import { FormContext } from "lib"
import { ErrorText } from "components"

const NameInput = () => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.labels.fullname}
        <input
          type="text"
          name="fullname"
          onChange={data.handleChange}
          onBlur={data.handleBlur}
          value={data.values.fullname}
        />
        {data.touched.fullname && data.errors.fullname && (
          <ErrorText msg={data.errors.fullname} />
        )}
      </div>
    )}
  </FormContext.Consumer>
)

export default NameInput
