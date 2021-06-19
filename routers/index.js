const express = require('express')
const router = express.Router()
const userRoutes = require('./userRoutes')
const newsRoutes = require('./newsRoutes')
const categoryRoutes = require('./categoryRoutes')
const historyRoutes = require('./historyRoutes')
const {authentication} = require('../middlewares/auth')

router.use('/', userRoutes)

router.use(authentication)
router.use('/category', categoryRoutes)
router.use('/news', newsRoutes)
router.use('/history', historyRoutes)

module.exports = router