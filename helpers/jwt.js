const jwt = require('jsonwebtoken')

function generateJWT(payload) {
  return jwt.sign(payload, process.env.JWT_KEY)
}

function verifyJWT(access_token) {
  return jwt.verify(access_token, process.env.JWT_KEY)
}

module.exports = {
  generateJWT,
  verifyJWT
}

