const express = require("express")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const chalk = require("chalk")
const path = require("path")
const { ApolloServer } = require("apollo-server-express")
const { makeExecutableSchema } = require("graphql-tools")

const postgres = require("./config/postgres")
const { authUtil } = require("./utils/index")
const typeDefs = require("./schema")
const resolvers = require("./resolvers")

const app = express()
const PORT = 8080

app.set("JWT_SECRET", process.env.JWT_SECRET || "DEV_SECRET")
app.set("JWT_COOKIE_NAME", "token")

if (process.env.NODE_ENV !== "development") {
  const root = path.resolve(__dirname, "../client")

  // Serve the static front-end from /public when deployed
  app.use(express.static(root))
  app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "../client/index.html"), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
  })
}

// Allow requests from server address
const corsConfig = {
  origin: "http://localhost:3000",
  credentials: true,
  methods: "GET,POST"
}
app.set("CORS_CONFIG", corsConfig)

// Allow requests from dev server address
app.use(cors(corsConfig))

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const apolloServer = new ApolloServer({
  context: ({ req }) => {
    if (
      req.headers.referer === "http://localhost:8080/graphql" &&
      process.env.NODE_ENV !== "production"
    ) {
      app.set("SKIP_AUTH", true)
    } else {
      app.set("SKIP_AUTH", false)
    }
    return {
      app,
      req,
      postgres,
      authUtil
    }
  },
  schema
})

apolloServer.applyMiddleware({
  app,
  uploads: true,
  cors: corsConfig
})

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
