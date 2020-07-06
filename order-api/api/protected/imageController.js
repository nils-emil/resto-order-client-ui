const express = require('express')
const router = express.Router({ mergeParams: true })

const upload = require('../../services/imageService')

const singleUpload = upload.single('image')

router.post('/upload', function (req, res) {
  singleUpload(req, res, function (err) {
    if (!err) {
      return res.json({
        'imageUrl': req.file.location,
        'imageName': req.file.originalname
      })
    } else {
      return res.status(400).json({
        message: 'File upload failed'
      })
    }
  })
})

module.exports = router
