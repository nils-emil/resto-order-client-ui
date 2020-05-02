import React, { useEffect, useState } from 'react'
import './styles.scss'
import { ArrowDown, ArrowUp, EditPencil, Trash } from '../../resources/icons_index'

function HeaderWithActions(props) {

  const {
    name,
    id,
    orderIncreaseAllowed,
    orderDecreaseAllowed,
    isListView,
    onDelete,
    onTitleChange,
    updateCategoryOrder
  } = props

  const [isButtonsVisible, setButtonsVisible] = useState(id !== null)
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

  const onChange = (event) => {
    setEditedName(event.target.value)
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
         onMouseLeave={() => setButtonsVisible(false)}>

      {isEditingEnabled && <input type="text" value={editedName} onChange={onChange}/>}
      {!isEditingEnabled && <h2 className="action-header__header-text">{name}</h2>}

      <div
        className={`action-header__header-buttons ${isButtonsVisible && isListView ? '' : 'action-header__header-buttons--hide'}`}>
        {orderIncreaseAllowed && isListView && <ArrowDown className="action-header__icon" onClick={() => updateCategoryOrder(1)}/>}
        {orderDecreaseAllowed && isListView && <ArrowUp className="action-header__icon" onClick={() => updateCategoryOrder(-1)}/>}
        {isListView && <EditPencil className="action-header__icon" onClick={toggleNameEdit}/>}
        <Trash className="action-header__icon" onClick={onDelete}/>
      </div>
    </div>
  )
}

export default HeaderWithActions
