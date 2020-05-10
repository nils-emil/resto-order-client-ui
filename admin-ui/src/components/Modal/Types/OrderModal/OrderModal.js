import React, { useEffect, useState } from 'react'
import { hideModal } from '../../../../store/actions/modal'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'
import { fetchByTableCode } from '../../../../services/orderService'
import OrderSelector from './OrderSelector/OrderSelector'

function OrderModal(props) {

  const { hideModal } = props
  const { order, modalResponseCallback } = props.options
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(order)

  useEffect(() => {
    fetchByTableCode(order.tableCode).subscribe((response) => {
      setOrders(response.data)
    })
  }, [])

  const dialogStyle = {
    height: '30em',
    width: '40em',
    padding: '.5rem'
  }

  const onConfirm = () => {
    modalResponseCallback({order: selectedOrder, isConfirm: true})
    hideModal()
  }

  const onClose = () => {
    modalResponseCallback({isConfirm: false})
    hideModal()
  }

  return (
    <Modal
      header={`Laud number ${order.tableCode} tellimused`}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText={'Kinnita'}
      dialogStyle={dialogStyle}
    >
      <div className="order-modal__content">
        <OrderSelector orders={orders} onClick={setSelectedOrder}/>
        <div className="order-modal__order-list">
          <p className="order-modal__list-title">{`Kell ${selectedOrder.createdTime} tehtud tellimus`}</p>
          {selectedOrder.orderContent.map(item => {
            return (
              <div className="order-modal__row" key={item._id}>
                <p className="order-modal__item-amount">{item.amount}x</p>
                <p className="order-modal__item-title">{item.menuItemId.title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(OrderModal)
