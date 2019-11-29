import React from "react"

import { FormContext } from "lib"
import { SingleCategoryInput } from "components"

const CategoryInput = () => (
  <FormContext.Consumer>
    {data => (
      <div>
        {data.values.categories.map((category, index) => (
          <SingleCategoryInput index={index} />
        ))}
      </div>
    )}
  </FormContext.Consumer>
)

export default CategoryInput
