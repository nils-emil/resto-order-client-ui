const express = require('express')
const router = express.Router({ mergeParams: true })
const jwt = require('jsonwebtoken')
const CategoryService = require('../../services/categoryService')
const categoryService = new CategoryService()
const { User } = require('../../models/user')

router.route('/:organizationId').get(async function (req, res) {
  const organizationId = req.params.organizationId

  const categories = await categoryService.fetchAll(organizationId, true)

  res.json(categories)
})


router.route('/add').post(async function (req, res) {

  const usertoken = req.headers.authorization;
  const decoded = jwt.verify(usertoken, process.env.JWT_KEY);
  const user = await User.findById(decoded._id).select('-password')
  const categoryDto = req.body
  categoryDto.organizationId = user.organizationId;

  const savedCategory = await categoryService.save(categoryDto)

  return res.json(savedCategory)
})

router.route('/update/:id').post(async function (req, res) {
  const categoryDto = req.body

  const savedCategory = await categoryService.update(categoryDto)

  return res.json(savedCategory)
})

router.route('/delete/:id').delete(function (req, res) {
  categoryService.remove(req.params.id)
  return res.status(204).send()
})

module.exports = router
