const { Pool } = require("pg")
const squel = require("squel").useFlavour("postgres")
const config = require("../config/default.json")

const userSeeds = [
  {
    fullname: "Simon Stern",
    email: "simon@simon.com",
    password: "$2a$12$C3fzh/z1u9PpTxjEPsK1SefXVritcsDfcL6ftQzWSkfgouSKR6BfS"
  },
  {
    fullname: "Jorrin Bruns",
    email: "jorrin@jorrin.com",
    password: "$2a$12$C3fzh/z1u9PpTxjEPsK1SefXVritcsDfcL6ftQzWSkfgouSKR6BfS"
  },
  {
    fullname: "Eirian Ta",
    email: "eirian@eirian.com",
    password: "$2a$12$C3fzh/z1u9PpTxjEPsK1SefXVritcsDfcL6ftQzWSkfgouSKR6BfS"
  },
  {
    fullname: "Akshay Manchanda",
    email: "akshay@akshay.com",
    password: "$2a$12$C3fzh/z1u9PpTxjEPsK1SefXVritcsDfcL6ftQzWSkfgouSKR6BfS"
  },
  {
    fullname: "Navi Hothi",
    email: "navi@navi.com",
    password: "$2a$12$C3fzh/z1u9PpTxjEPsK1SefXVritcsDfcL6ftQzWSkfgouSKR6BfS"
  },
  {
    fullname: "Vaughn Paulger",
    email: "vaughn@vaughn.com",
    password: "$2a$12$C3fzh/z1u9PpTxjEPsK1SefXVritcsDfcL6ftQzWSkfgouSKR6BfS"
  }
]

const quizSeeds = [
  {
    title: "RED Adp Quiz",
    owner_id: 4
  },
  {
    title: "Test Quiz",
    owner_id: 4
  }
]

const categorySeeds = [
  {
    name: "Animals",
    quiz_id: 1
  },
  {
    name: "Technology",
    quiz_id: 1
  }
]

const questionSeeds = [
  {
    category_id: 1,
    quiz_id: 1,
    question: "Which part of the platypus is poisonous?",
    answer: "What is the barb on the foot?",
    points: 200
  },
  {
    category_id: 1,
    quiz_id: 1,
    question: "Is this an animal question?",
    answer: "What is the animal answer?",
    points: 400
  },
  {
    category_id: 1,
    quiz_id: 1,
    question: "Is this an animal question?",
    answer: "What is the animal answer?",
    points: 600
  },
  {
    category_id: 1,
    quiz_id: 1,
    question: "Is this an animal question?",
    answer: "What is the animal answer?",
    points: 800
  },
  {
    category_id: 1,
    quiz_id: 1,
    question: "Is this an animal question?",
    answer: "What is the animal answer?",
    points: 1000
  }
]
const seed = async () => {
  const pg = await new Pool(config.db).connect()

  try {
    await pg.query("BEGIN")

    console.log("Seeding Users...")

    await Promise.all(
      userSeeds.map(userSeed =>
        pg.query(
          squel
            .insert()
            .into("jeopardy.users")
            .setFields(userSeed)
            .toParam()
        )
      )
    )

    console.log("Seeding Users... [DONE]")

    console.log("Seeding Quizzes...")

    await Promise.all(
      quizSeeds.map(quizSeed =>
        pg.query(
          squel
            .insert()
            .into("jeopardy.quizzes")
            .setFields(quizSeed)
            .toParam()
        )
      )
    )

    console.log("Seeding Quizzes... [DONE]")

    console.log("Seeding Categories...")

    await Promise.all(
      categorySeeds.map(categorySeed =>
        pg.query(
          squel
            .insert()
            .into("jeopardy.categories")
            .setFields(categorySeed)
            .toParam()
        )
      )
    )

    console.log("Seeding Categories... [DONE]")

    console.log("Seeding Questions...")

    await Promise.all(
      questionSeeds.map(questionSeed =>
        pg.query(
          squel
            .insert()
            .into("jeopardy.questions")
            .setFields(questionSeed)
            .toParam()
        )
      )
    )

    console.log("Seeding Questions... [DONE]")

    await pg.query("COMMIT")
  } catch (e) {
    await pg.query("ROLLBACK")
    throw e
  } finally {
    pg.release()
  }
}

seed().catch(e => {
  setImmediate(() => {
    throw e
  })
})
