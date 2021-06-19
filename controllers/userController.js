const { User } = require('../models')
const { checkPassword } = require('../helpers/bcrypt')
const { generateJWT } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

class UserController {
  static register(req, res, next) {
    const {email, password, phoneNumber, address} = req.body
    console.log('di userController <<<<<<<<<<<<<<<<<<<<<<<<<<<<');
    User.create({
      email,
      password,
      role: 'admin',
      phoneNumber,
      address
    })
    .then(user => {
      res.status(201).json({
        id: user.id,
        email: user.email
      })
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let errMsg = err.errors.map(e => {
          return e.message
        })
        next({name: 'SequelizeValidationError', message: errMsg})
      } else if (err.name === 'SequelizeUniqueConstraintError') {        
        next({name: 'SequelizeUniqueConstraintError', message: err.message})
      } else {
        next({message: err})
      }
    })
  }

  static googleLogin(req, res, next) {
    let payload
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    client.verifyIdToken({
      idToken: req.body.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    })
    .then(ticket => {
      payload = ticket.getPayload()

      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
    .then(foundUser => {
      if (foundUser) {
        return foundUser
      } else {
        return User.create({
          email: payload.email,
          password: process.env.GOOGLE_PASSWORD,
          role: 'staff',
        })
      }
    })
    .then(user => {
      const access_token = generateJWT({
        id: user.id,
        email: user.email
      })
      const role = user.role
      const id = user.id
      const email = user.email
      res.status(200).json({access_token, role, id, email})
    })
    .catch(err => {
      next({message: err}) 
      console.log(err);
    })

  }

  static login(req, res, next) {
    const {email, password} = req.body
    User.findOne({
      where: {email}
    })
    .then(user => {
      if (user) {
        if (checkPassword(password, user.password)) {
          const access_token = generateJWT({
            id: user.id,
            email: user.email,
          })
          const role = user.role
          const id = user.id
          const email = user.email
          res.status(200).json({access_token, role, id, email})
        } else {
          next({name: 'EmailPasswordinvalid', message: 'invalid email or password'})
        }
      } else {
        next({name: 'EmailPasswordinvalid', message: 'invalid email or password'})
      }
    })
    .catch(err => {
      next({message: err})
    })
  }
}

module.exports = UserController