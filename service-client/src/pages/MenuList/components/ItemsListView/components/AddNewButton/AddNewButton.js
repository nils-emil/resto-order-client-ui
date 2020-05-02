import React from 'react'
import './styles.scss'
import { Add } from '../../../../../../resources/icons_index'

function AddNewButton(props) {

  const { onClick } = props

  return (
    <div className="add-new-button" onClick={onClick}>
      <Add className="add-new-button__icon"/>
      <p className="add-new-button__text">Lisa uus</p>
    </div>
  )
}

export default AddNewButton
