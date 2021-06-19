const { History } = require('../models')

class HistoryController {
  static getHistory(req, res, next) {
    History.findAll()
    .then(history => {
      res.status(200).json(history)
    })
    .catch(err => {
      next({message: err})
    })
  }
}

module.exports = HistoryController