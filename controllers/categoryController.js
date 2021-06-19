const {Category} = require('../models')

class CategoryController {
  static getAllCategories(req, res, next) {
    Category.findAll()
    .then(categories => {
      res.status(200).json(categories)
    })
    .catch(err => {
      next({message: err})
    })
  }
}

module.exports = CategoryController