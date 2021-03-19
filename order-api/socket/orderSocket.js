const Order = require('../models/order').Order
const timeUtil = require('../util/timeUtil')

const EMIT_REFRESH_ORDERS = ''

const orderSocket = (socket, io) => {
    socket.on('MARK_ORDER_SERVICED', function (data) {
        Order.findOne({_id: data._id},
            (err, order) => {
                if (order) {
                    order['isWaiting'] = order && !order['isWaiting']
                    order.save()
                    io.emit(EMIT_REFRESH_ORDERS + order.organizationId, 'refresh')
                }
            })
    })
}

module.exports = {
    orderSocket: orderSocket
}
