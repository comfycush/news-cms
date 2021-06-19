const { verifyJWT } = require('../helpers/jwt')
const { User, News } = require('../models/')

function authentication(req, res, next) {
  const access_token = req.headers.access_token

  if(access_token) {
    try {
      const payload = verifyJWT(access_token)    
      User.findByPk(payload.id)
      .then(user => {
        if (user) {
          req.user = {id: user.id, role: user.role, email: user.email}
          next()
        } else {
          next({name: 'InvalidJWT', message: 'invalid JWT'})
        }
      })
      .catch(err => {
        next({message: err})
      })
    } catch {
      next({name: 'InvalidJWT', message: 'invalid JWT'})
    }

  } else {
    next({name: 'Unauthorized', message: 'please login first'})
  }
}

function authorization(req, res, next) {
  const newsId = +req.params.id
  News.findByPk(newsId)
  .then(news => {
    if (news) {
      if (req.user.role === 'admin') {
        next()
      } else {
        if (req.user.id === news.authorId) {
          next()
        } else {
          next({name: 'Forbidden', message: 'access forbidden'})
        }
      }
    } else {
      next({name: 'NotFound', message: 'news not found'})
    }
  })
  .catch(err => {
    next({message: err})
  })
}


module.exports = {
  authentication,
  authorization
}