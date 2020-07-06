import React from 'react'
import './styles.scss'
import { Add } from '../../resources/icons_index'

function TextButtonWithIcon(props) {

  const { onClick } = props
  return (
    <div className="text-button-with-icon" onClick={onClick}>
      <Add className="text-button-with-icon__icon"/>
      <p className="text-button-with-icon__text">Lisa uus</p>
    </div>
  )
}

export default TextButtonWithIcon
