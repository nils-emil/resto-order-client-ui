import React from 'react'
import './styles.scss'

export const buttonModifiers = {
  MARGINTOP: 'margin-top',
  MARGINLEFT: 'margin-left',
}

function TextButton(props) {

  const { onClick, isTransparent, Icon, children, modifiers = [] } = props

  const modifierClasses = () => {
    let classes = ''
    modifiers.forEach(modifier =>{
      classes = classes + `text-button--${modifier} `
    })
    return classes
  }


  return (
    <div className={`text-button ${isTransparent ? 'text-button--transparent' : ''} ${modifierClasses()}`} onClick={onClick}>
      {Icon && <Icon class="text-button__icon"/>}
      <p className="text-button__text">{children}</p>
    </div>
  )
}

export default TextButton
