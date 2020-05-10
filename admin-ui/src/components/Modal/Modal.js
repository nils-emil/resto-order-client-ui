import React, { useEffect } from 'react'
import './styles.scss'
import TextButton, { buttonModifiers } from '../TextButton/TextButton'
import { YinYang } from '../../resources/icons_index'

function Modal(props) {
  const { onClose, onConfirm, children, header, dialogStyle, confirmButtonText = 'Salvesta', isLoading = false } = props

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

  const content = () => {
    if (isLoading) {
      return <YinYang className="modal__loading-spinner"/>
    } else {
      return (
        <>
          <h1 className="modal__header">{header}</h1>
          <div className="modal__content">
            {children}
          </div>
          <div className="modal__footer">
            <TextButton onClick={onClose}
                        modifiers={[buttonModifiers.TRANSPARENT, buttonModifiers.SMALL, buttonModifiers.INLINE]}>Tühista</TextButton>
            <TextButton onClick={onConfirm}
                        modifiers={[buttonModifiers.SMALL, buttonModifiers.INLINE]}>{confirmButtonText}</TextButton>
          </div>
        </>
      )
    }
  }

  return (
    <div className="modal" onClick={onOverlayClick}>
      <div className="modal__dialog" style={dialogStyle} onClick={onDialogClick}>
        {content()}
      </div>
    </div>
  )
}

export default Modal
