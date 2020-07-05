import React from 'react'
import './styles.scss'

function TextArea(props) {

  const { onChange, value, label } = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <div className="text-area">
      <label className="text-area__label">{label}</label>
      <textarea
        className="text-area__input"
        value={value}
        onChange={handleChange}
        spellCheck={false}
      />
    </div>
  )
}

export default TextArea
