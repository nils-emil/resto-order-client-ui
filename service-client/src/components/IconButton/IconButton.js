import React from 'react'
import './styles.scss'

function IconButton(props) {

  const { Icon } = props

  return (
    <div className="icon-button">
      <Icon className="icon-button__icon"/>
    </div>
  )
}

export default IconButton
