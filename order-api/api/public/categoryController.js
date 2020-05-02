const express = require('express')
const router = express.Router({ mergeParams: true })

const CategoryService = require('../../services/categoryService')
const categoryService = new CategoryService()

router.route('/:organizationId').get(async function (req, res) {
  const organizationId = req.params.organizationId

  const categories = await categoryService.fetchAll(organizationId)
  let uncategorized = {
    '_id': null,
    'name': 'Kategooriata',
    'organizationId': req.params.organizationId,
    'order': -1
  }
  res.json([...categories, uncategorized])
})

module.exports = router
