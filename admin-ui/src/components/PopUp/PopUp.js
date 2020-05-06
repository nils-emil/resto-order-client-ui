import React from 'react'
import './styles.scss'
import { CheckMarkOutline, CloseOutline, ExclamationOutline } from '../../resources/icons_index'
import { hidePopUp } from '../../store/actions/popup'
import { connect } from 'react-redux'

export const popUpVariants = {
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  ALERT: 'ALERT'
}

function PopUp(props) {

  const { type, text, hidePopUp } = props

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
    <div className="pop-up" onClick={hidePopUp}>
      <Icon/>
      <p className="pop-up__text">{text}</p>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  hidePopUp: (popUpType, popUpText) => dispatch(hidePopUp(popUpType, popUpText))
})

export default connect(null, mapDispatchToProps)(PopUp)
