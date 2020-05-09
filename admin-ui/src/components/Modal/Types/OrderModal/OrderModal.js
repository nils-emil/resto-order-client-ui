import React from 'react'
import { hideModal } from '../../../../store/actions/modal'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'

function OrderModal(props) {

  const { hideModal } = props
  const { order, modalResponseCallback } = props.options

  const dialogStyle = {
    height: '50em',
    width: '40em',
    padding: '.5rem'
  }

  const onConfirm = () => {
    modalResponseCallback(true)
    hideModal()
  }

  const onClose = () => {
    modalResponseCallback(false)
    hideModal()
  }

  return (
    <Modal
      header={`Laua ${order.tableCode} tellimus`}
      onClose={onClose}
      onConfirm={onConfirm}
      confirmButtonText={'Kinnita'}
      dialogStyle={dialogStyle}
    >
      <div className='order-modal__content'>
        {order.orderContent.map(item => {
          return (
            <div className="order-modal__row" key={item._id}>
              <p className="order-modal__item-amount">{item.amount}x</p>
              <p className="order-modal__item-title">{item.menuItemId.title}</p>
            </div>
          )
        })}
      </div>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(OrderModal)
