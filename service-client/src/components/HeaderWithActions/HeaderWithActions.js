import React, { useEffect, useState } from 'react'
import './styles.scss'
import { ArrowDown, ArrowUp, EditPencil, Trash } from '../../resources/icons_index'
import TextField, { modifiers, variants } from '../TextField/TextField'

function HeaderWithActions(props) {

  const {
    name,
    isListView,
    onDelete,
    onTitleChange,
    updateCategoryOrder
  } = props

  const [isButtonsVisible, setButtonsVisible] = useState(true)
  const [isEditingEnabled, setEditingMode] = useState(false)
  const [editedName, setEditedName] = useState('')

  useEffect(() => {
    if (isEditingEnabled) {
      window.addEventListener('keydown', listenKeyboard)
    } else {
      window.removeEventListener('keydown', listenKeyboard)
    }

    return () => window.removeEventListener('keydown', listenKeyboard)
  }, [isEditingEnabled, editedName])

  const listenKeyboard = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      onTitleChange(editedName, toggleNameEdit)
    }
  }

  const onChange = (value) => {
    setEditedName(value)
  }

  const toggleNameEdit = () => {
    if (!isEditingEnabled) {
      setEditedName(name)
    }

    setEditingMode(!isEditingEnabled)
  }

  return (
    <div className="action-header"
         onMouseEnter={() => setButtonsVisible(true)}
         onMouseLeave={() => setButtonsVisible(false)}
    >
      {isEditingEnabled && <TextField variant={variants.LIGHT} modifiers={[modifiers.BOLD]} value={editedName} onChange={onChange}/>}
      {!isEditingEnabled && <h2 className="action-header__header-text">{name}</h2>}
      <div
        className={`action-header__header-buttons ${isButtonsVisible || !isListView ? '' : 'action-header__header-buttons--hide'}`}>
        {isListView && <ArrowDown className="action-header__icon" onClick={() => updateCategoryOrder(1)}/>}
        {isListView && <ArrowUp className="action-header__icon" onClick={() => updateCategoryOrder(-1)}/>}
        {isListView && <EditPencil className="action-header__icon" onClick={toggleNameEdit}/>}
        <Trash className="action-header__icon" onClick={onDelete}/>
      </div>
    </div>
  )
}

export default HeaderWithActions
