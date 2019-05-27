const express = require("express")
const cors = require("cors")
const chalk = require("chalk")

const app = express()
const PORT = process.env.PORT || 8080

// Allow requests from server address
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,POST"
}
app.set("CORS_CONFIG", corsConfig)

// Allow requests from dev server address
app.use(cors(corsConfig))

const server = app.listen(PORT, () => {
  console.log(`>> ${chalk.blue("Express running:")} http://localhost:${PORT}`)

  console.log(
    `>> ${chalk.magenta(
      "GraphQL playground:"
    )} http://localhost:${PORT}/graphql`
  )
})

server.on("error", err => {
  console.log(err)
})
