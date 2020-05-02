import React from 'react'
import './styles.scss'

function SelectField(props) {

  const { options, value, label, onChange } = props

  const handleChange = (event) => {
    onChange(event.target.value)
  }

  return (
    <div className="select-field">
      <label className="select-field__label">{label}</label>
      <select value={value} onChange={handleChange}>
        {options.map(option => {
          return <option className="select-field__option" key={option._id} value={option._id}>{option.name}</option>
        })}
      </select>
    </div>
  )
}

export default SelectField
