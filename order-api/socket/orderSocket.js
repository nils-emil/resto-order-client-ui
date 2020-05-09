const Order = require('../models/order').Order
const timeUtil = require('../util/timeUtil')

const EMIT_REFRESH_ORDERS = 'REFRESH-ORDERS-'
const EMIT_ALL_ORDERS = 'ALL_ORDERS'

const RECEIVE_FETCH_ALL_ORDERS = 'FETCH_ALL_ORDERS'
const RECEIVE_ORDER_PLACED = 'ORDER_PLACED'
const RECEIVE_ORDER_SERVICED = 'MARK_ORDER_SERVICED'

const orderSocket = (socket, io) => {
  socket.on(RECEIVE_ORDER_PLACED, function (body) {
    io.emit(EMIT_REFRESH_ORDERS + body.organizationId, 'refresh')
  })

  socket.on(RECEIVE_FETCH_ALL_ORDERS, function (data) {
    Order
      .find({
        organizationId: data.organizationId,
        createdDate: timeUtil.extractTime(new Date()).date
      })
      .populate('orderContent.menuItemId')
      .sort({ createdTime: -1 })
      .exec((err, orders) => {
        socket.emit(EMIT_ALL_ORDERS, orders)
      })
  })

  socket.on(RECEIVE_ORDER_SERVICED, function (data) {
    Order.findOne(data,
      (err, order) => {
        order['isWaiting'] = !order['isWaiting']
        order.save()

        io.emit(EMIT_REFRESH_ORDERS + order.organizationId, 'refresh')
      })
  })
}

module.exports = {
  orderSocket: orderSocket
}
