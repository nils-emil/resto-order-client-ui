import React from 'react'
import { hideModal } from '../../../../store/actions/modal'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'

function ConfirmModal(props) {

  const { hideModal } = props
  const { modalResponseCallback } = props.options

  const dialogStyle = {
    height: '14em'
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
      header={'Kinnita oma tegevus'}
      onClose={onClose}
      onConfirm={onConfirm}
      dialogStyle={dialogStyle}
    >
      <p className='confirm-modal__text'>Kas soovid eset kustutada?</p>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(ConfirmModal)
