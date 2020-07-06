import React from 'react'
import { connect } from 'react-redux'
import '../resources/animations.scss'
import PopUp from '../components/PopUp/PopUp'

const PopUpContainer = (props) => {
  const { popupArray } = props

  return (
    <div className="pop-up__container">
      {popupArray.map(popup => {
        return (
          <PopUp type={popup.options.type} text={popup.options.text}/>
        )
      })}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    popupArray: state.popup
  }
}

export default connect(mapStateToProps, null)(PopUpContainer)
