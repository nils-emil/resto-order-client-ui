const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 4000
const cors = require('cors')
const ServiceCall = require('../order-api/models/serviceCall').ServiceCall
const timeUtil = require('./util/timeUtil')
require('./config/db').connection
// require('./mockData/dropdb')
// require('./mockData/data')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(require('./api'))

const server = app.listen(PORT, function () {
  console.log('Server is running on Port:', PORT)
})

const socket = require('socket.io')
io = socket(server)

io.on('connection', (socket) => {

  socket.on('CALL_SERVICE', function (data) {
    const serviceCall = new ServiceCall(data)
    const{date, time} = timeUtil.extractTime(new Date)
    serviceCall.callDate = date;
    serviceCall.callTime = time;
    serviceCall.callTime = data.callType;
    serviceCall.callTime = data.callType;
    serviceCall.isWaiting = true
    serviceCall.save(() => {
      io.emit('SERVICE_CALLED', serviceCall)
    })
  })

  socket.on('ORDER_PLACED', function (body) {
      io.emit('REFRESH-ORDERS-' + body.organizationId, "refresh")
  })

  socket.on('GET_ALL_UNSERVICED_TABLES', function (data) {
    ServiceCall.find({callDate: timeUtil.extractTime(new Date()).date}, (err, calls) => {
      socket.emit('ALL_UNSERVICED_TABLES', calls.sort((a, b) => timeUtil.compareTimes(a, b)).slice(0, 20))
    })
  })

  socket.on('MARK_TABLE_SERVICED', function (data) {
    ServiceCall.findOne(data,
      (err, call) => {
        call['isWaiting'] = false;
        call.save()
      })

  })
})
