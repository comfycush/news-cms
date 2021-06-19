const errHandler = (err, req, res, next) => {
  //receiving:
  //next({name: 'SequelizeValidationError', message: 'email is required'})
  let name = err.name
  let message = err.message

  switch(name) {
    case 'SequelizeValidationError':
    case 'SequelizeUniqueConstraintError':
      res.status(400).json({message})
      break
    case 'InvalidJWT':
    case 'EmailPasswordinvalid':
      res.status(401).json({message})
      break
    case 'Forbidden':
      res.status(403).json({message})
    case 'NotFound':
      res.status(404).json({message})
      break      
    default:
      res.status(500).json({message})
      break
  }
}

module.exports = errHandler