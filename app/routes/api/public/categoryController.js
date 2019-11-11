const express = require('express')
const router = express.Router({ mergeParams: true })
const Category = require('../../../models/category').Category

router.route('/').get(function (req, res) {
  Category.find((err, Categories) => {
    if (err) {
      console.log(err)
    } else {
      res.json(Categories)
    }
  })
})

module.exports = router
