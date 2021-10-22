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

// app.get('/', (req, res) => {
//   console.log(req.verifiedUser)
//   res.json({ msg: 'well cum' })
// })

// app.get('/authtest', (req, res) => {
//   res.json(createJwtToken({ username: 'ffff' }))
// })

// app.head('/graphql', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:9000')
//   res.header('Access-Control-Request-Method', 'GET, POST')
//   res.header('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type, Content-Length')
//   res.end()
// })

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
