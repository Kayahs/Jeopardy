import React from "react"

import { FormContext } from "lib"
import { ErrorText } from "components"

const CategoryName = ({ index }) => (
  <FormContext.Consumer>
    {data => {
      const handleChange = event => {
        data.setFieldValue(`categories[${index}].name`, event.target.value)
      }
      const handleBlur = () => {
        data.setFieldTouched(`categories[${index}].name`)
      }
      return (
        <div>
          {data.labels.name}
          <input
            type="text"
            name="categoryName"
            value={data.values.categories[index].name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {
            // data.touched.categories[index].name &&
            // data.errors.categories[index].name && (
            //   <ErrorText msg={data.errors.categories[index].name} />
            // )
          }
        </div>
      )
    }}
  </FormContext.Consumer>
)

export default CategoryName
