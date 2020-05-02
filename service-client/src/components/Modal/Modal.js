import React, { useEffect } from 'react'
import './styles.scss'
import TextButton from '../TextButton/TextButton'

function Modal(props) {
  const { onClose, onConfirm, children, header, dialogStyle } = props

  useEffect(() => {
    window.addEventListener('keydown', listenKeyboard, true)
    return () => {
      window.removeEventListener('keydown', listenKeyboard, true)
    }
  }, [onConfirm, onClose])

  const listenKeyboard = (event) => {
    if (event.key === 'Escape' || event.keyCode === 27) {
      event.stopPropagation()
      onOverlayClick()
    } else if (event.key === 'Enter' || event.keyCode === 13) {
      onConfirm()
    }
  }

  const onOverlayClick = () => {
    onClose()
  }

  const onDialogClick = (event) => {
    event.stopPropagation()
  }

  return (
    <div className="modal" onClick={onOverlayClick}>
      <div className="modal__dialog" style={dialogStyle} onClick={onDialogClick}>
        <h1 className="modal__header">{header}</h1>
        <div className="modal__content">
          {children}
        </div>
        <div className="modal__footer">
          <TextButton onClick={onClose} isTransparent>Tühista</TextButton>
          <TextButton onClick={onConfirm}>Salvesta</TextButton>
        </div>
      </div>
    </div>
  )
}

export default Modal
