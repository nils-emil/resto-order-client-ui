const bcrypt = require('bcryptjs')
const { User, validate } = require('../../models/user')
const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
  const { error } = validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //find an existing user
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered.')

  user = new User({
    password: req.body.password,
    email: req.body.email
  })
  user.password = await bcrypt.hash(user.password, 10)
  await user.save()
  return res.status(200).send({ ok: true })

})

router.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email })
    if (!user || !req.body.password) {
      return res.status(403).send({ error: 'Username or password incorrect' })
    }
    const passwordMatches = await bcrypt.compare(req.body.password, user.password)
    if (passwordMatches) {
      const token = user.generateAuthToken()
      return res.status(200).send({ user: user, token: token })
    }
    return res.status(403).send({ error: 'Username or password incorrect' })
  }
)

module.exports = router
