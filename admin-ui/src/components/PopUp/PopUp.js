import React from 'react'
import './styles.scss'
import { CheckMarkOutline, CloseOutline, ExclamationOutline } from '../../resources/icons_index'

export const popUpVariants = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  ALERT: 'ALERT'
}

function PopUp(props) {

  const { type, text } = props

  const Icon = () => {
    switch (type) {
      case popUpVariants.SUCCESS:
        return <CheckMarkOutline className="pop-up__icon pop-up__icon--success"/>
      case popUpVariants.ERROR:
        return <CloseOutline className="pop-up__icon pop-up__icon--error"/>
      default:
        return <ExclamationOutline className="pop-up__icon pop-up__icon--exclamation"/>
    }
  }

  return (
    <div className="pop-up">
      <Icon/>
      <p className="pop-up__text">{text}</p>
    </div>
  )
}


export default PopUp
