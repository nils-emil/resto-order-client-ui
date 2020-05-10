const express = require('express')
const router = express.Router({ mergeParams: true })

const upload = require('../../services/imageService')

const singleUpload = upload.single('image')

router.post('/upload', function (req, res) {

  singleUpload(req, res, function (err) {
    return res.json({
      'imageUrl': req.file.location,
      'imageName': req.file.originalname
    })
  })
})

module.exports = router
