import React from 'react'
import { connect } from 'react-redux'
import { modals } from '../components/Modal/Types/index'
import '../resources/animations.scss'

const ModalContainer = (props) => {
  const { modalType, options } = props

  if (!modalType) {
    return null
  }

  const SpecificModal = modals[modalType]

  return <SpecificModal options={options}/>
}

const mapStateToProps = state => {
  return {
    modalType: state.modal.modalType,
    options: state.modal.options
  }
}

export default connect(mapStateToProps)(ModalContainer)
