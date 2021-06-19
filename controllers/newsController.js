const { News } = require('../models')
const writeHistory = require('../helpers/writeHistory')

class NewsController {
  static createNews(req, res, next) {
    let news
    const {title, content, categoryId} = req.body 
    News.create({
      title,
      content,
      imgUrl: req.imgUrl,
      authorId: req.user.id,
      categoryId,
      status: 'Active'
    })
    .then(data => {
      news = data
      return writeHistory(news.id, news.title, req.user.email, 'create')
    })
    .then(() => {
      res.status(201).json({news})
    })
    .catch(err => {
      if (err.name === 'SequelizeValidationError') {
        let errMsg = err.errors.map(e => {
          return e.message
        })
        next({name: 'SequelizeValidationError', message: errMsg})
      } else {
        next({message: err})
      }
    })
  }

  static getAllNews(req, res, next) {
    News.findAll({
      include: {all: true},
      order: [['id', 'ASC']]
    })
    .then(news => {
      res.status(200).json(news)
    })
    .catch(err => {
      next({message: err})
    })
  }

  static getNewsById(req, res, next) {
    const id = +req.params.id
    News.findByPk(id,{
      include: {all: true}
    })
    .then(news => {
      if(news) {
        res.status(200).json(news)
      } else {
        next({name: 'NotFound', message: 'news with with such id not found'})
      }
    })
    .catch(err => {
      next({message: err})
    })
  }

  static putNewsById(req, res, next) {
    const id = +req.params.id
    const {title, content, categoryId} = req.body
    let newData
    if (req.imgUrl) {
      newData = {title, content, imgUrl: req.imgUrl, categoryId}
    } else {
      newData = {title, content, categoryId}
    }

    News.update(newData, {
      where: {id: id}
    })
    .then(countOfUpdatedRows => {
      if (countOfUpdatedRows[0] === 1) {
        return writeHistory(id, title, req.user.email, 'put')
      } else {
        next({name: 'NotFound', message: 'cannot update non-existing news'})
      }
    })
    .then(() => {
      res.status(200).json({newData})
    })
    .catch(err => {
      if(err.name === 'SequelizeValidationError') {
        let errMsg = err.errors.map(e => {
          return e.message
        })
        next({name: 'SequelizeValidationError', message: errMsg})
      } else {
        next({message: err})
      }
    })
  }

  static deleteNewsById(req, res, next) {
    const id = +req.params.id
    let newsTitle
    News.findOne({
      where: {id}
    })
    .then(news => {
      newsTitle = news.title
      return News.destroy({
        where: {id}
      })
    })
    .then(countOfDeletedRows => {
      if(countOfDeletedRows) {
        return writeHistory(id, newsTitle, req.user.email, 'delete')
      } else {
        next({name: 'NotFound', message: 'cannot delete non-existing news'})
      }
    })
    .then(() => {
      res.status(200).json({message: 'selected news has been successfully deleted'})
    })
    .catch(err => {
      next({message: err})
    })
  }

  static patchNewsById(req, res, next) {
    const id = +req.params.id
    let previousStatus
    let newsTitle
    let { status } = req.body
    let statusObj = {status}

    News.findOne({
      where: {id}
    })
    .then(news => {
      previousStatus = news.status
      newsTitle = news.title
      return News.update(statusObj, {
        where: { id }
      })
    })    
    .then(() => {
      return writeHistory(id, newsTitle, req.user.email, 'patch', previousStatus, status)
    })
    .then(() => {
      res.status(200).json({message: `news status has been updated to ${status}`})
    })
    .catch(err => {
      next({message: err})
    })
  }
}

module.exports = NewsController