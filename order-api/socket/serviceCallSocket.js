const ServiceCall = require('../models/serviceCall').ServiceCall
const timeUtil = require('../util/timeUtil')

const EMIT_SERVICE_CALLED = 'SERVICE_CALLED'
const EMIT_ALL_SERVICE_CALLS = 'ALL_SERVICE_CALLS'

const RECEIVE_FETCH_SERVICE_CALLS = 'FETCH_ALL_SERVICE_CALLS'
const RECEIVE_CALL_SERVICE = 'CALL_SERVICE'
const RECEIVE_SERVICE_CALL_SERVICED = 'SERVICE_CALL_SERVICED'

const serviceCallSocket = (socket, io) => {
  socket.on(RECEIVE_CALL_SERVICE, function (data) {
    const serviceCall = new ServiceCall(data)
    const { date, time } = timeUtil.extractTime(new Date)
    serviceCall.createdDate = date
    serviceCall.createdTime = time
    serviceCall.callType = data.callType
    serviceCall.isWaiting = true
    serviceCall.save(() => {
      io.emit(EMIT_SERVICE_CALLED, serviceCall)
    })
  })

  socket.on(RECEIVE_FETCH_SERVICE_CALLS, function (data) {
    ServiceCall.find({ createdDate: timeUtil.extractTime(new Date()).date }, (err, calls) => {
      socket.emit(EMIT_ALL_SERVICE_CALLS, calls.sort((a, b) => timeUtil.compareTimes(a, b)).slice(0, 20))
    })
  })

  socket.on(RECEIVE_SERVICE_CALL_SERVICED, function (data) {
    ServiceCall.findOne(data,
      (err, call) => {
        call['isWaiting'] = !call['isWaiting']
        call.save()
      })
  })
}

module.exports = {
  serviceCallSocket: serviceCallSocket
}
