const express = require('express')
const router = express.Router({ mergeParams: true })

const CategoryService = require('../../services/categoryService')
const categoryService = new CategoryService()

router.route('/:organizationId').get(async function (req, res) {
  const organizationId = req.params.organizationId
  const categories = await categoryService.fetchAll(organizationId, false)
  res.json(categories)
})

module.exports = router
