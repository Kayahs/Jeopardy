module.exports = {
  Quiz: {
    async owner(parent, args, { postgres }, info) {
      const id = parent.owner_id

      const getUser = {
        text: "SELECT * FROM jeopardy.users WHERE id=$1",
        values: [id]
      }

      const getUserResult = await postgres.query(getUser)
      const user = getUserResult.rows[0]

      return user
    },
    async categories({ id }, args, { postgres }, info) {
      const getCategories = {
        text: "SELECT * FROM jeopardy.categories WHERE quiz_id=$1",
        values: [id]
      }

      const getCategoriesResult = await postgres.query(getCategories)
      const categories = getCategoriesResult.rows

      return categories
    }
  }
}
