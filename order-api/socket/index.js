const orderSocketWrapper = require('./orderSocket')
const serviceCallSocketWrapper = require('./serviceCallSocket')

const sockets = (server) => {
  const socket = require('socket.io')
  const io = socket(server)

  io.on('connection', (socket) => {
    const orderSocket = orderSocketWrapper.orderSocket(socket, io)
    const serviceCallSocket = serviceCallSocketWrapper.serviceCallSocket(socket, io)
  })
}

module.exports = {
  sockets: sockets
}
