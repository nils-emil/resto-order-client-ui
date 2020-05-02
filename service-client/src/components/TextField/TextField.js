import React from 'react'
import './styles.scss'

export const modifiers = {
  FULLWIDTH: 'full-width',
  MARGINTOP: 'margin-top',
  BOLD: 'bold'
}

export const variants = {
  DARK: 'dark',
  LIGHT: 'light'
}


export const types = {
  NUMERIC: 'NUMERIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
  PRICE: 'PRICE'
}

function TextField(props) {

  const { onChange, value, type, label, variant = variants.DARK, modifiers = [], autoFocus } = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  const modifierClasses = () => {
    let classes = ''
    modifiers.forEach(modifier =>{
      classes = classes + `text-field--${modifier} `
    })
    return classes
  }

  return (
    <div className={`text-field text-field--${variant} ${modifierClasses()}`}>
      <label className="text-field__label">{label}</label>
      <input
        className="text-field__input"
        type={type === types.PRICE || type === types.NUMERIC ? 'number' : 'text'}
        value={value}
        onChange={handleChange}
        placeholder={label}
        autoFocus={autoFocus}
        spellCheck={false}
      />
    </div>
  )
}

export default TextField
