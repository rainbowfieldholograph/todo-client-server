const express = require('express')
const dotenv = require('dotenv')
const { graphqlHTTP } = require('express-graphql')
const app = express()
const { connectDB } = require('./db/mongo')
const schema = require('./graphql/schema')
const { authenticate } = require('./middleware/auth')
const cors = require('cors')

dotenv.config()
const PORT = process.env.PORT || 5000

connectDB()

app.use(authenticate)
app.use(cors())

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
)

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`)
})
