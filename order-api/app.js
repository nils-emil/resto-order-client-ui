const express = require('express')
const app = express()
const PORT = 4000

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = require('./config/db').connection

const server = app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT)
})

const socketWrapper = require('./socket/index')
const sockets = socketWrapper.sockets(server)

app.use(require('./api'))

const User = require('./models/user').User
const jwt = require('jsonwebtoken')
global.extractOrganizationFromRequest = async (request) => {
  const token = request.headers.authorization;
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  const user = await User.findById(decoded._id).select('-password')
  return user.organizationId;
}