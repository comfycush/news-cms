const axios = require('axios')
const FormData = require('form-data')

function toImageKit(req, res, next) {
  let api_key = Buffer.from(process.env.IMAGEKIT_PRIVATE_KEY, 'utf-8').toString(
    'base64'
  )
  
  if (!req.file) { // akan skip axios jika user tidak mengupload image
    next()
  } else {
    const data = new FormData()
    data.append('file', req.file.buffer.toString('base64'))
    data.append('fileName', req.file.originalname)
    
    axios({
      url: 'https://upload.imagekit.io/api/v1/files/upload',
      method: 'post',
      headers: {
        Authorization: `Basic ${api_key}`,
        ...data.getHeaders()
      },
      data: data
    })
    .then(data => {
      data.data.url = data.data.url.slice(0, 38) + "tr:ar-4-3,w-300/" + data.data.url.slice(38)
      req.imgUrl = data.data.url
      next()
    })
    .catch(err => {
      next({message: err})
    })
  }

}

module.exports = toImageKit