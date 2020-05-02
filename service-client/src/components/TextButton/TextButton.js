import React from 'react'
import './styles.scss'


function TextButton(props) {

  const { onClick, isTransparent, Icon, children } = props

  return (
    <div className={`text-button ${isTransparent ? 'text-button--transparent' : ''}`} onClick={onClick}>
      {Icon && <Icon class="text-button__icon"/>}
      <p className="text-button__text">{children}</p>
    </div>
  )
}

export default TextButton
