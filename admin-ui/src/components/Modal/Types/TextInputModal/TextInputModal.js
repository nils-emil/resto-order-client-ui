import React, { useState, useEffect } from 'react'
import { hideModal } from '../../../../store/actions/modal'
import Modal from '../../Modal'
import './styles.scss'
import { connect } from 'react-redux'
import TextField, { modifiers, variants } from '../../../TextField/TextField'

function TextInputModal(props) {

  const { hideModal } = props
  const { modalResponseCallback, initialState, header, textFieldName } = props.options

  const emptyState = { text: '' }
  const [modalState, setModalState] = useState(initialState || emptyState)

  useEffect(() => {
  }, [modalState])

  const onConfirm = () => {
    modalResponseCallback(modalState)
    hideModal()
  }

  const onClose = () => {
    hideModal()
  }

  const onChange = (value) => {
    setModalState({ text: value })
  }

  return (
    <Modal
      className="image-add-modal"
      header={header}
      isWithFooter
      onClose={onClose}
      onConfirm={onConfirm}
    >
      <h1 className="image-add-modal__header">
        <TextField
          value={modalState.text}
          onChange={onChange}
          variant={variants.DARK}
          label={textFieldName}
          autoFocus
          modifiers={[modifiers.FULLWIDTH, modifiers.MARGINTOP, modifiers.FULLWIDTH]}
        />
      </h1>
    </Modal>
  )
}

const mapDispatchToProps = dispatch => ({
  hideModal: () => dispatch(hideModal())
})

export default connect(null, mapDispatchToProps)(TextInputModal)
