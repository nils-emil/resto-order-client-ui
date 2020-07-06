import React, { useEffect, useState } from 'react'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'
import { fetchByTableCode } from '../../../../services/orderService'
import OrderSelector from './OrderSelector/OrderSelector'
import { hideModal } from '../../../../store/actions/modal'

const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches

function OrderModal(props) {

  const { hideModal } = props
  const { order, modalResponseCallback } = props.options
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(order)

  useEffect(() => {
    if (!isMobile) {
      fetchByTableCode(order.tableCode).subscribe((response) => {
        setOrders(response.data)
      })
    }
  }, [])

  const dialogStyle = () => {
    if (isMobile) {
      return { height: '50vh' }
    } else {
      return {
        height: '30em',
        width: '40em',
        padding: '.5rem'
      }
    }
  }

  const onConfirm = () => {
    modalResponseCallback({ order: selectedOrder, isConfirm: true })
    hideModal()
  }

  const onClose = () => {
    modalResponseCallback({ isConfirm: false })
    hideModal()
  }

  const header = () => {
    if (isMobile) {
      return `Laua ${order.tableCode} tellimus kell ${order.createdTime}`
    } else {
      return `Laud number ${order.tableCode} tellimused`
    }
  }

  return (
    <Modal
      header={header()}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText={'Kinnita'}
      dialogStyle={dialogStyle()}
    >
      <div className="order-modal__content">
        {!isMobile && <OrderSelector orders={orders} onClick={setSelectedOrder}/>}
        <div className="order-modal__order-list">
          {!isMobile && <p className="order-modal__list-title">{`Kell ${selectedOrder.createdTime} tehtud tellimus`}</p>}
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
