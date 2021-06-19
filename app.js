if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const errHandler = require('./middlewares/errorHandler')
const router = require('./routers')
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.use(router)

app.use(errHandler)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})