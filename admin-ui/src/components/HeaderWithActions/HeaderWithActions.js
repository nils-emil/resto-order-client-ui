import React, { useEffect, useState } from 'react'
import './styles.scss'
import { ArrowDown, ArrowUp, CheckMark, Close, EditPencil, Trash } from '../../resources/icons_index'
import TextField, { modifiers, variants } from '../TextField/TextField'

function HeaderWithActions(props) {

  const {
    name,
    orderIncreaseAllowed,
    orderDecreaseAllowed,
    isListView,
    onDelete,
    onTitleChange,
    updateCategoryOrder
  } = props

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
    <div className="action-header">
      {isEditingEnabled &&
      <TextField variant={variants.LIGHT} modifiers={[modifiers.BOLD, modifiers.INLINE]} value={editedName} onChange={onChange}/>}
      {!isEditingEnabled && <h2 className="action-header__header-text">{name}</h2>}
      <div className={`action-header__header-buttons ${!isListView ? '' : 'action-header__header-buttons--hide'}`}>
        {!isEditingEnabled && orderIncreaseAllowed && <ArrowDown className="action-header__icon" onClick={() => updateCategoryOrder(1)}/>}
        {!isEditingEnabled && orderDecreaseAllowed && <ArrowUp className="action-header__icon" onClick={() => updateCategoryOrder(-1)}/>}
        {!isEditingEnabled && isListView && <EditPencil className="action-header__icon" onClick={toggleNameEdit}/>}
        {isEditingEnabled && <Close className="action-header__icon" onClick={toggleNameEdit}/>}
        {isEditingEnabled && <CheckMark className="action-header__icon" onClick={() => onTitleChange(editedName, toggleNameEdit)}/>}
        {!isEditingEnabled && <Trash className="action-header__icon" onClick={onDelete}/>}
      </div>
    </div>
  )
}

export default HeaderWithActions
