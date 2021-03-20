const orderSocketWrapper = require('./orderSocket')

const sockets = (server) => {
  const socket = require('socket.io')
  const io = socket(server)

  console.log("Socket init called")
  io.on('connection', (socket) => {
    global.socket = socket
    global.io = io
    const orderSocket = orderSocketWrapper.orderSocket(socket, io)
  })
  return io;
}

module.exports = {
  sockets: sockets
}
