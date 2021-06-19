const express = require('express')
const NewsController = require('../controllers/newsController')
const router = express.Router()
const { authorization } = require('../middlewares/auth')

const toImageKit = require('../middlewares/toImageKit')
const multer = require('multer')

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    console.log(new Error('only jpeg or png file allowed!'))
    cb(new Error('only jpeg or png file allowed!'), false)
  }
}

const upload = multer({
  limits: {
    fileSize: 1024 * 255
  },
  fileFilter
})


router.route('/')
.post(upload.single('imgUrl'), toImageKit, NewsController.createNews)
.get(NewsController.getAllNews)

//authorization here
router.use('/:id', authorization)

router.route('/:id')
.get(NewsController.getNewsById)
.put(upload.single('imgUrl'), toImageKit, NewsController.putNewsById)
.patch(NewsController.patchNewsById)
.delete(NewsController.deleteNewsById)



module.exports = router