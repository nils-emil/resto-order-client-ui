import React from 'react'
import './styles.scss'

function OrderSelector(props) {

  const { orders, onClick } = props

  return (
    <div className="order-selector">
      {orders.map(order => {
        return (
          <div className="order-selector__order-wrapper" onClick={() => onClick(order)} key={order._id}>
            <p>{order.createdTime}</p>
          </div>
        )
      })}
    </div>
  )

}

export default OrderSelector
