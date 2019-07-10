module.exports = {
  Query: {
    async getQuizzes(parent, args, { postgres }, info) {
      const getQuizzesQuery = {
        text: "SELECT * FROM jeopardy.quizzes"
      }

      const getQuizzesResult = await postgres.query(getQuizzesQuery)

      return getQuizzesResult.rows
    }
  }
}
