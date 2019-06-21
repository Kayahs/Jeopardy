const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const saltRounds = 12

module.exports = {
  Mutation: {
    async signup(
      parent,
      {
        input: { fullname, email, password }
      },
      { app, req, postgres },
      info
    ) {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const emailLowerCase = email.toString().toLowerCase()

      const newUserInsert = {
        text:
          "INSERT INTO jeopardy.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
        values: [fullname, emailLowerCase, hashedPassword]
      }

      const newUserResult = await postgres.query(newUserInsert)
      return {
        user: newUserResult.rows[0]
      }
    },
    async login(
      parent,
      {
        input: { email, password }
      },
      { app, req, postgres },
      info
    ) {
      const emailLowerCase = email.toString().toLowerCase()

      const getUser = {
        text: "SELECT * FROM jeopardy.users WHERE email=$1",
        values: [emailLowerCase]
      }

      const getUserResult = await postgres.query(getUser)
      const user = getUserResult.rows[0]
      if (!user) {
        return {
          error: {
            code: 401,
            message: "Email or Password is Invalid"
          }
        }
      }

      const validPassword = await bcrypt.compare(password, user.password)

      if (!validPassword) {
        return {
          error: {
            code: 401,
            message: "Email or Password is Invalid"
          }
        }
      }

      return {
        user: user
      }
    }
  }
}
