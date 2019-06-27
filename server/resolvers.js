const queryResolvers = require("./resolvers/query/queryResolvers")
const mutationResolvers = require("./resolvers/mutation/mutationResolvers")
const quizResolvers = require("./resolvers/quiz/quizResolvers")

module.exports = {
  ...queryResolvers,
  ...mutationResolvers,
  ...quizResolvers
}
