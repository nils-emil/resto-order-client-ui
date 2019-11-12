const express = require('express')
const router = express.Router({ mergeParams: true })
const Category = require('../../../models/category').Category

router.route('/:organizationId').get(function (req, res) {
  console.log(req.params.organizationId)
  Category.find({organizationId: req.params.organizationId})
    .exec()
    .then(categories => {
      res.json(categories)
    })
})

module.exports = router
