module.exports = {
  Query: {
    async message(parent, args, { app, req, postgres }, info) {
      const getMessageQuery = {
        text: "SELECT * FROM jeopardy.users"
      }

      const getMessageResult = await postgres.query(getMessageQuery)

      console.log(getMessageResult.rows)
      return "Success"
    }
  }
}
