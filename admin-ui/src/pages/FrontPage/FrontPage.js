import React, { useEffect, useState } from 'react'

import './styles.scss'
import TablePlan from '../../components/TablePlan/TablePlan'
import ActivityFeed from '../../components/ActivityFeed/ActivityFeed'
import Navigation, { pages } from '../../components/Navigation/Navigation'
import {
  EMIT_FETCH_ALL_ORDERS,
  EMIT_FETCH_SERVICE_CALLS,
  EMIT_ORDER_SERVICED,
  EMIT_SERVICE_CALL_SERVICED,
  RECEIVE_ALL_ORDERS,
  RECEIVE_ALL_SERVICE_CALLS,
  RECEIVE_REFRESH_ORDERS,
  RECEIVE_SERVICE_CALLED
} from '../../components/ActivityFeed/socketConstants'
import { fetchAll } from '../../services/orderService'
import io from 'socket.io-client'
import { connect } from 'react-redux/es/alternate-renderers'

const socket = io(process.env.REACT_APP_BACKEND_URL)


function FrontPage(props) {

  const { organizationId } = props.auth.user

  const [serviceCalls, setServiceCalls] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    socket.on(RECEIVE_ALL_SERVICE_CALLS, (data) => {
      setServiceCalls(data.map(call => transformServiceCall(call)))
    })

    socket.emit(EMIT_FETCH_SERVICE_CALLS)

    return () => {
      socket.off(RECEIVE_ALL_SERVICE_CALLS)
    }
  }, [])


  useEffect(() => {
    socket.on(RECEIVE_SERVICE_CALLED, function (data) {
      setServiceCalls([transformServiceCall(data), ...serviceCalls])
    })

    return () => {
      socket.off(RECEIVE_SERVICE_CALLED)
    }
  })

  useEffect(() => {
    socket.on(RECEIVE_ALL_ORDERS, (data) => {
      setOrders(data.map(order => transformOrder(order)))
    })

    socket.emit(EMIT_FETCH_ALL_ORDERS, { organizationId })

    return () => {
      socket.off(RECEIVE_ALL_ORDERS)
    }
  }, [])


  useEffect(() => {
    socket.on(RECEIVE_REFRESH_ORDERS + organizationId, function () {
      fetchAll().subscribe(response => {
        setOrders(response.data.map(order => transformOrder(order)))
      })
    })

    return () => {
      socket.off(RECEIVE_REFRESH_ORDERS + organizationId)
    }
  })

  const transformServiceCall = (call) => {
    return Object.assign(call, { message: `Laud ${call.tableCode} tellis ${call.callType === 'PAYMENT' ? 'kaardimakse' : 'teeninduse'}` })
  }

  const transformOrder = (order) => {
    return Object.assign(order, { message: `Laud ${order.tableCode} tellis süüa` })
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
    socket.emit(EMIT_SERVICE_CALL_SERVICED, {
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
    socket.emit(EMIT_ORDER_SERVICED, {
      _id: order._id
    })
  }

  return (
    <div className="home">
      <div className="home__activity-feed">
        <ActivityFeed
          orders={orders}
          toggleOrderWaiting={toggleOrderWaiting}
          serviceCalls={serviceCalls}
          toggleServiceCallWaiting={toggleServiceCallWaiting}
        />
      </div>
      <div className="home__table-plan">
        <TablePlan
          orders={orders}
          serviceCalls={serviceCalls}
        />
      </div>
      <div className="home__navigation">
        <Navigation currentPage={pages.HOME}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(FrontPage)
