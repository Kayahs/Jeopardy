const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")
const Promise = require("bluebird")

const saltRounds = 12

module.exports = {
  Mutation: {
    async signup(
      parent,
      {
        input: { fullname, email, password }
      },
      { app, req, postgres, authUtil },
      info
    ) {
      try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        const emailLowerCase = email.toString().toLowerCase()

        const newUserInsert = {
          text:
            "INSERT INTO jeopardy.users (fullname, email, password) VALUES ($1, $2, $3) RETURNING *",
          values: [fullname, emailLowerCase, hashedPassword]
        }

        const newUserResult = await postgres.query(newUserInsert)
        const user = newUserResult.rows[0]
        const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
        const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
          "base64"
        )
        authUtil.setCookie({
          tokenName: app.get("JWT_COOKIE_NAME"),
          token: authUtil.generateToken(user, app.get("JWT_SECRET"), csrfToken),
          res: req.res
        })
        return {
          user,
          csrfToken
        }
      } catch (e) {
        if (e.constraint == "users_email_key") {
          return {
            error: {
              code: 401,
              message: "That email address is taken, please enter a new email."
            }
          }
        }
        console.log(e)
      }
    },
    async login(
      parent,
      {
        input: { email, password }
      },
      { app, req, postgres, authUtil },
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

      const csrfTokenBinary = await Promise.promisify(crypto.randomBytes)(32)
      const csrfToken = Buffer.from(csrfTokenBinary, "binary").toString(
        "base64"
      )

      authUtil.setCookie({
        tokenName: app.get("JWT_COOKIE_NAME"),
        token: authUtil.generateToken(user, app.get("JWT_SECRET"), csrfToken),
        res: req.res
      })

      return {
        user,
        csrfToken
      }
    },
    async logout(parent, {}, { app, req }) {
      const cookieName = app.get("JWT_COOKIE_NAME")
      req.res.clearCookie(cookieName)
      return true
    },
    async createQuiz(
      parent,
      {
        input: { title }
      },
      { app, req, postgres, authUtil },
      info
    ) {
      const userId = authUtil.authenticate(app, req)

      const createQuiz = {
        text:
          "INSERT INTO jeopardy.quizzes (title, owner_id) VALUES ($1,$2) RETURNING *",
        values: [title, userId]
      }

      const createQuizResult = await postgres.query(createQuiz)
      const quiz = createQuizResult.rows[0]

      return {
        quiz
      }
    },
    async addCategory(
      parent,
      {
        input: { name, quiz_id }
      },
      { app, req, postgres, authUtil },
      info
    ) {
      const userId = authUtil.authenticate(app, req)

      const getQuizOwner = {
        text: "SELECT owner_id FROM jeopardy.quizzes WHERE id=$1",
        values: [quiz_id]
      }

      const getQuizOwnerResult = await postgres.query(getQuizOwner)
      if (userId != getQuizOwnerResult.rows[0].owner_id)
        return {
          error: {
            code: 401,
            message: "Please stop sending weird requests to my server."
          }
        }

      const addQuizCategory = {
        text:
          "INSERT INTO jeopardy.categories (name, quiz_id) VALUES ($1, $2) RETURNING *",
        values: [name, quiz_id]
      }

      const addQuizCategoryResult = await postgres.query(addQuizCategory)
      const category = addQuizCategoryResult.rows[0]

      return { category }
    },
    async addQuestion(
      parent,
      {
        input: { category_id, quiz_id, question, answer, points }
      },
      { app, req, postgres, authUtil },
      info
    ) {
      const userId = authUtil.authenticate(app, req)

      const getQuizOwner = {
        text: "SELECT owner_id FROM jeopardy.quizzes WHERE id=$1",
        values: [quiz_id]
      }

      const getQuizOwnerResult = await postgres.query(getQuizOwner)

      if (userId != getQuizOwnerResult.rows[0].owner_id)
        return {
          error: {
            code: 401,
            message: "Please stop sending weird requests to my server."
          }
        }

      const getNumQuestions = {
        text:
          "SELECT count(id) FROM jeopardy.questions WHERE quiz_id=$1 AND category_id=$2",
        values: [quiz_id, category_id]
      }

      const getNumQuestionsResult = await postgres.query(getNumQuestions)
      const numQuestions = getNumQuestionsResult.rows[0].count
      if (numQuestions >= 5)
        return {
          error: { code: 400, message: "Too many questions for this category." }
        }

      const addQuestion = {
        text:
          "INSERT INTO jeopardy.questions (category_id, quiz_id, question, answer, points) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        values: [category_id, quiz_id, question, answer, points]
      }

      const addQuestionResult = await postgres.query(addQuestion)
      const new_question = addQuestionResult.rows[0]

      return {
        question: new_question
      }
    }
  }
}
