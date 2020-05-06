import React, { useEffect, useState } from 'react'
import './styles.scss'
import io from 'socket.io-client'
import Feed from '../FeedWithHeader/Feed'
import { connect } from 'react-redux/es/alternate-renderers'
import { fetchAll } from '../../services/orderService'
import FeedSelector from '../FeedSelector/FeedSelector'

const socket = io(process.env.REACT_APP_BACKEND_URL)

function ActivityFeed(props) {

  const { organizationId } = props.auth.user

  const [serviceCalls, setServiceCalls] = useState([])
  const [isServiceCallSelected, selectServiceCalls] = useState(true)
  const [orders, setOrders] = useState([])

  useEffect(() => {
    socket.on('ALL_UNSERVICED_TABLES', (data) => {
      setServiceCalls(data.map(call => transformServiceCall(call)))
    })

    socket.emit('GET_ALL_UNSERVICED_TABLES')

    return () => {
      socket.off('ALL_UNSERVICED_TABLES')
    }
  }, [])


  useEffect(() => {
    socket.on('SERVICE_CALLED', function (data) {
      setServiceCalls([transformServiceCall(data), ...serviceCalls])
    })

    return () => {
      socket.off('SERVICE_CALLED')
    }
  })

  useEffect(() => {
    fetchAll().subscribe(response => {
      setOrders(response.data.map(order => transformOrder(order)))
    })
  }, [])

  useEffect(() => {
    socket.on(`REFRESH-ORDERS-${organizationId}`, function () {
      fetchAll().subscribe(response => {
        setOrders(response.data.map(order => transformOrder(order)))
      })
    })

    return () => {
      socket.off(`REFRESH-ORDERS-${organizationId}`)
    }
  })

  const transformServiceCall = (call) => {
    return {
      _id: call._id,
      message: `Laud ${call.tableCode} tellis ${call.callType === 'PAYMENT' ? 'kaardimakse' : 'teeninduse'}`,
      isWaiting: call.isWaiting,
      callTime: call.callTime
    }
  }

  const transformOrder = (order) => {
    return {
      _id: order._id,
      message: `Laud ${order.tableCode} tellis süüa`,
      isWaiting: order.isWaiting,
      callTime: order.callTime
    }
  }

  const toggleServiceCallWaiting = (call) => {
    let callsCopy = [...serviceCalls]
    callsCopy.forEach(originalCall => {
        if (originalCall === call) {
          originalCall.isWaiting = !call.isWaiting
        }
      }
    )

    setServiceCalls(callsCopy)
    socket.emit('MARK_TABLE_SERVICED', {
      _id: call._id
    })
  }

  const toggleOrderWaiting = (order) => {
    let ordersCopy = [...orders]
    ordersCopy.forEach(originalOrder => {
        if (originalOrder === order) {
          originalOrder.isWaiting = !order.isWaiting
        }
      }
    )

    setOrders(ordersCopy)
    socket.emit('MARK_ORDER_SERVICED', {
      _id: order._id
    })
  }

  return (
    <div className="activity-feed">
      <div>
        <FeedSelector isServiceCallSelected={isServiceCallSelected}
                      selectServiceCalls={() => selectServiceCalls(true)}
                      isServiceRequiringCallAttention={serviceCalls.some(call => {
                        return call.isWaiting
                      })}
                      selectOrders={() => selectServiceCalls(false)}
                      isOrderRequiringAttention={orders.some(order => {
                        return order.isWaiting
                      })}
        />
      </div>
      <Feed serviceCalls={isServiceCallSelected ? serviceCalls : orders}
            onClick={isServiceCallSelected ? toggleServiceCallWaiting : toggleOrderWaiting}
      />
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(ActivityFeed)
