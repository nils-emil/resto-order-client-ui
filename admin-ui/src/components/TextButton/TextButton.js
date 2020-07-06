import React from 'react'
import './styles.scss'

export const buttonModifiers = {
  MARGINTOP: 'margin-top',
  MARGINLEFT: 'margin-left',
  TRANSPARENT: 'transparent',
  TRANSPARENT_LIGHT: 'transparent-light',
  SMALL: 'small',
  INLINE: 'in-line'
}

function TextButton(props) {

  const { onClick, Icon, children, modifiers = [] } = props

  const modifierClasses = () => {
    let classes = ''
    modifiers.forEach(modifier =>{
      classes = classes + `text-button--${modifier} `
    })
    return classes
  }


  return (
    <div className={`text-button ${modifierClasses()}`} onClick={onClick}>
      {Icon && <Icon class="text-button__icon"/>}
      <p className="text-button__text">{children}</p>
    </div>
  )
}

export default TextButton
