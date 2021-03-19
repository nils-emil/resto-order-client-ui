const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const credentials = require('../config/credentials')

aws.config.update({
  accessKeyId: credentials.accessKeyId,
  secretAccessKey: credentials.secretAccessKey,
  region: 'eu-north-1'
})

const s3 = new aws.S3()

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'no-chat-resto',
    acl: 'public-read',
    metadata: function (req, file, cb) {
      cb(null, { fieldName: "image" })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

module.exports = upload
