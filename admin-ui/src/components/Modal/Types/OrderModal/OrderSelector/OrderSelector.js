import React from 'react'
import './styles.scss'
import { ExclamationOutline } from '../../../../../resources/icons_index'

function OrderSelector(props) {

  const { orders, onClick } = props

  return (
    <div className="order-selector">
      {orders.map(order => {
        return (
          <div className="order-selector__order-wrapper" onClick={() => onClick(order)} key={order._id}>
            <p>{order.createdTime}</p>
            {order.isWaiting && <ExclamationOutline className='order-selector__alert-indicator'/>}
          </div>
        )
      })}
    </div>
  )

}

export default OrderSelector
