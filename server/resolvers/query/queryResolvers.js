module.exports = {
  Query: {
    async message(parent, args, { app, req, postgres }, info) {
      return "Success"
    }
  }
}
