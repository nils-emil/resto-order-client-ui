const auth = require('../../middleware/auth')
const User = require('../../models/user').User
const express = require('express')
const router = express.Router()
const UserService = require('../../services/userService')
const userService = new UserService()
const jwt = require('jsonwebtoken')

router.get('/current', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.get('/all', auth, async (req, res) => {
  const usertoken = req.headers.authorization;
  const decoded = jwt.verify(usertoken, process.env.JWT_KEY);
  const user = await User.findById(decoded._id).select('-password')
  let organizationId = user.organizationId;
  const users = await userService.fetchAll(organizationId)
  res.json(users)
})

router.route('/add').post(async function (req, res) {
  const user = new User(req.body)
  const usertoken = req.headers.authorization;
  const decoded = jwt.verify(usertoken, process.env.JWT_KEY);
  const creator = await User.findById(decoded._id).select('-password')
  let preExistingUser = await userService.findById(user._id);
  if (preExistingUser) {
    user.password = preExistingUser.password;
    preExistingUser.username = user.username;
    preExistingUser.email = user.email;
    preExistingUser.save();
    res.status(200).json(preExistingUser)
  } else {
    user.organizationId = creator.organizationId;
    user.save().then(e => {
      res.status(200).json(e)
    }).catch(e => {
      res.status(400).send('Unable to save to database')
    })
  }
})


router.route('/delete').post(function (req, res) {
  User.deleteOne({ _id: req.body._id }, (err) => {
    if (err) {
      res.json(err)
    } else {
      res.json('Successfully removed')
    }
  })
})


module.exports = router
