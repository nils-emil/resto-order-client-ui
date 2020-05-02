import React, { useEffect, useState } from 'react'
import './styles.scss'
import ImageAdd from './components/ImageAdd/ImageAdd'
import ItemForm from './components/ItemForm/ItemForm'
import { addMenuItem, removeMenuItem, updateMenuItem } from '../../../../services/menuItemService'
import { connect } from 'react-redux'
import { CONFIRM_MODAL } from '../../../../components/Modal/Types/index'
import { loadModal } from '../../../../store/actions/modal'
import { showPopUpWithTimeout } from '../../../../store/actions/popup'
import { getCategories } from '../../../../services/categoryService'
import HeaderWithActions from '../../../../components/HeaderWithActions/HeaderWithActions'
import { popUpVariants } from '../../../../components/PopUp/PopUp'

function ItemEditView(props) {

  const { itemToEdit, selectedCategory, organizationId, closeEdit, showPopUpWithTimeout } = props

  const emptyItem = {
    imageUrl: '',
    title: '',
    categoryId: selectedCategory._id,
    organizationId: organizationId,
    price: 0,
    description: ''
  }

  const [item, setItem] = useState(itemToEdit || emptyItem)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getCategories(organizationId).subscribe(e => {
      setCategories(e.data)
    })
  }, [])

  const save = () => {
    const saveAction = itemToEdit ? updateMenuItem : addMenuItem

    const observer = {
      next: () => {
        showPopUpWithTimeout({ type: popUpVariants.SUCCESS, text: `Edukalt uuendatud ${item.title}` })
        closeEdit()
      },
      error: error => {
        showPopUpWithTimeout({ type: popUpVariants.ERROR, text: error.response.data })
      }
    }

    saveAction(item).subscribe(observer)
  }

  const updateField = (target, value) => {
    const modifiedItem = { ...item }
    modifiedItem[target] = value
    setItem(modifiedItem)
  }

  const openDeleteModal = () => {
    props.loadModal(CONFIRM_MODAL, { modalResponseCallback })
  }

  const modalResponseCallback = (response) => {
    if (response) {
      removeMenuItem(item._id).subscribe(() => {
        closeEdit()
      })
    }
  }

  return (
    <div className="item-edit-view">
      <div className="item-edit-view__header">
        <h2 className="item-list-view__header-text">{itemToEdit?.title || 'Uue eseme lisamine'}</h2>
        {itemToEdit &&
        <HeaderWithActions
          name={itemToEdit.title}
          onDelete={openDeleteModal}
        />
        }
      </div>
      <div className="item-edit-view__edit-section">
        <div className="item-edit-view__image-section">
          <ImageAdd
            className="item-edit-view__image-section"
            imageUrl={item.imageUrl}
            onChange={updateField}
          />
        </div>

        <div className="item-edit-view__text-section">
          <ItemForm
            item={item}
            categories={categories}
            onChange={updateField}
            save={save}
            cancel={() => closeEdit()}
          />
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback)),
  showPopUpWithTimeout: (popUpType, popUpText) => dispatch(showPopUpWithTimeout(popUpType, popUpText))
})

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemEditView)
