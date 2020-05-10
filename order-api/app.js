const express = require('express')
const app = express()
const PORT = 4000

const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const db = require('./config/db').connection
//require('./mockData/dropdb')
//require('./mockData/data')
//require('./mockData/test-data')

const server = app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT)
})

const socketWrapper = require('./socket/index')
const sockets = socketWrapper.sockets(server)

const api = app.use(require('./api'))
