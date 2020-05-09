import React from 'react'
import './styles.scss'

export const modifiers = {
  FULLWIDTH: 'full-width',
  MARGINTOP: 'margin-top',
  BOLD: 'bold',
  INLINE: 'in-line'
}

export const variants = {
  DARK: 'dark',
  LIGHT: 'light'
}


export const types = {
  NUMERIC: 'NUMERIC',
  ALPHANUMERIC: 'ALPHANUMERIC',
  PRICE: 'PRICE',
  PASSWORD: 'PASSWORD'
}

function TextField(props) {

  const { onChange, value, type, label, variant = variants.DARK, modifiers = [], autoFocus} = props

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

  const getType = () => {
    if (type === types.PRICE || type === types.NUMERIC) {
      return 'number'
    } else if (type === types.PASSWORD) {
      return 'password'
    } else {
      return 'text'
    }
  }

  return (
    <div className={`text-field text-field--${variant} ${modifierClasses()}`}>
      <label className="text-field__label">{label}</label>
      <input
        className="text-field__input"
        type={getType()}
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
