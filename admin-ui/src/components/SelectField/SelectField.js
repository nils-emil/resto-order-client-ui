import React, { useEffect, useState } from 'react'
import './styles.scss'
import { ChevronDown } from '../../resources/icons_index'

function SelectField(props) {

  const { options, value, label, onChange } = props
  const [isDropdownOpen, toggleDropDown] = useState(false)

  useEffect(() => {
    if (isDropdownOpen) {
      window.addEventListener('click', clickHandler, true)
    } else {
      window.removeEventListener('click', clickHandler, true)
    }
  }, [isDropdownOpen])

  const clickHandler = (event) => {
    if (!!['select-field__option', 'select-field__button'].indexOf(event.target.className)) {
      toggleDropDown(false)
    }
  }

  const handleChange = (value) => {
    onChange(value)
    toggleDropDown(false)
  }

  return (
    <div className="select-field">
      <label className="select-field__label">{label}</label>
      <button
        onClick={() => toggleDropDown(!isDropdownOpen)}
        className="select-field__button"
      >
        {options.find(option => option._id === value)?.name || 'Vali kategooria'}
        <ChevronDown className="select-field__down-icon"/>
      </button>
      <div className={`select-field__option-list ${isDropdownOpen ? 'select-field__option-list--visible' : ''}`}>
        {options.map(option => {
          return <div onClick={() => handleChange(option._id)} className="select-field__option"
                      key={option._id}>{option.name}</div>
        })}
      </div>
    </div>
  )
}

export default SelectField
