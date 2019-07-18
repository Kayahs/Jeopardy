import React from "react"

const CategoryList = ({ categories }) => (
  <ul>
    {categories.map(category => (
      <li key={`category-${category.id}`}>{category.name}</li>
    ))}
  </ul>
)

export default CategoryList
