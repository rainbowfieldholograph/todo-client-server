const jwt = require('jsonwebtoken')

const createJwtToken = (id, username) => {
  const payload = { id, username }
  const token = jwt.sign(payload, process.env.SECRET_KEY_JWT, {
    expiresIn: '24h',
  })
  return token
}

module.exports = { createJwtToken }

// const jwt = require('jsonwebtoken')

// const createJwtToken = (id, username) => {
//   const payload = { id, username }
//   console.log(payload)
//   return jwt.sign(payload, process.env.SECRET_KEY_JWT, {
//     expiresIn: '24h',
//   })
// }

// module.exports = { createJwtToken }
