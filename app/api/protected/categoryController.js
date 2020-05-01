const express = require('express')
const router = express.Router({mergeParams: true})

const CategoryService = require('../../services/categoryService')
const categoryService = new CategoryService()

router.route('/add').post(async function (req, res) {
  const categoryDto = req.body

  const savedCategory = await categoryService.save(categoryDto)

  return res.json(savedCategory)
})

router.route('/update/:id').post(async function (req, res) {
  const categoryDto = req.body

  const savedCategory = await categoryService.update(categoryDto)

  return res.json(savedCategory)
})

router.route('/delete/:id').delete(async function (req, res) {
  await categoryService.remove(req.params.id)

  return res.status(204).send()
})

module.exports = router
