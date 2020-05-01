import React, { useEffect, useState } from 'react'
import './styles.scss'
import MenuItem from './components/MenuItem/MenuItem'
import AddNewButton from './components/AddNewButton/AddNewButton'
import { getMenuItems } from '../../../../services/menuItemService'
import HeaderWithActions from '../../../../components/HeaderWithActions/HeaderWithActions'
import { deleteCategory, updateCategory } from '../../../../services/categoryService'
import { CONFIRM_MODAL } from '../../../../components/Modal/Types'
import { loadModal } from '../../../../store/actions/modal'
import { showPopUpWithTimeout } from '../../../../store/actions/popup'
import { connect } from 'react-redux'
import { popUpVariants } from '../../../../components/PopUp/PopUp'

function ItemsListView(props) {

  const { selectedCategory, organizationId, setEditingItem, toggleEditing, refreshCategories, showPopUpWithTimeout } = props
  const [menuItems, setMenuItems] = useState([])

  useEffect(() => {
    getMenuItems(organizationId).subscribe(e => {
      setMenuItems(e.data)
    })
  }, [])

  const menuItemsToDisplay = () => {
    return menuItems
      .filter(menuItem => menuItem.categoryId === selectedCategory._id)
      .map(menuItem => <MenuItem key={menuItem.title} menuItem={menuItem} onClick={() => setEditingItem(menuItem)}/>)
  }

  const openDeleteModal = () => {
    props.loadModal(CONFIRM_MODAL, { modalResponseCallback })
  }

  const createPopUpObserver = (callBack) => {
    return ({
      next: () => {
        showPopUpWithTimeout({ type: popUpVariants.SUCCESS, text: `Edukalt kustutatud ${selectedCategory.name}` })
        callBack()
      },
      error: error => {
        showPopUpWithTimeout({ type: popUpVariants.ERROR, text: error.response.data })
      }
    })
  }

  const modalResponseCallback = (response) => {
    if (response) {
      deleteCategory(selectedCategory._id).subscribe(createPopUpObserver(refreshCategories))
    }
  }

  const changeCategoryName = (newName, toggleNameEdit) => {
    let updatedCategory = Object.assign({}, selectedCategory)
    updatedCategory.name = newName

    updateCategory(updatedCategory).subscribe(createPopUpObserver(() => {
      toggleNameEdit()
      refreshCategories()
    }))
  }

  const updateCategoryOrder = (amount) => {
    let updatedCategory = Object.assign({}, selectedCategory)
    updatedCategory.order = selectedCategory.order + amount

    updateCategory(updatedCategory).subscribe(() => refreshCategories(updatedCategory))
  }

  const MenuList = () => {
    return (
      <div className="item-list-view__menu-list">
        {menuItemsToDisplay()}
        <div className="item-list-view__add-new-button">
          <AddNewButton onClick={toggleEditing}/>
        </div>
      </div>
    )
  }

  return (
    <div className="item-list-view">
      <HeaderWithActions
        name={selectedCategory.name}
        onDelete={openDeleteModal}
        onTitleChange={changeCategoryName}
        updateCategoryOrder={updateCategoryOrder}
        isListView
      />
      <MenuList/>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback)),
  showPopUpWithTimeout: (popUpType, popUpText) => dispatch(showPopUpWithTimeout(popUpType, popUpText))
})

export default connect(null, mapDispatchToProps)(ItemsListView)
