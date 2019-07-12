const queryResolvers = require("./query/queryResolvers")
const mutationResolvers = require("./mutation/mutationResolvers")
const quizResolvers = require("./quiz/quizResolvers")

module.exports = {
  ...queryResolvers,
  ...mutationResolvers,
  ...quizResolvers
}
