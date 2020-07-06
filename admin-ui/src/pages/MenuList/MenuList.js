import React, { useEffect, useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux/es/alternate-renderers'
import CategoriesView from './components/CategoriesView/CategoriesView'
import ItemsListView from './components/ItemsListView/ItemsListView'
import ItemEditView from './components/ItemEditView/ItemEditView'
import { getCategories } from '../../services/categoryService'

function MenuList(props) {
  const { organizationId } = props.auth.user

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({ _id: 0, name: '' })
  const [isEditing, setEditingMode] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    refreshCategories(1)
  }, [])

  const refreshCategories = (selectedOrder) => {
    getCategories(organizationId).subscribe(e => {
      setCategories(e.data)
      selectCategory(selectedOrder, e.data)
    })
  }

  const toggleEditing = (item) => {
    if (item) {
      setEditingMode(true)
      setEditingItem(item)
    } else {
      setEditingMode(false)
      setEditingItem(null)
    }
  }

  const selectCategory = (selectedCategoryOrder, fromCategories = categories) => {
    const selectedCategory = fromCategories[selectedCategoryOrder - 1]
    if (fromCategories.length > 2 && selectedCategoryOrder < fromCategories.length - 1) {
      selectedCategory.orderIncreaseAllowed = true
    }

    if (fromCategories.length > 2 && selectedCategoryOrder > 1 && selectedCategoryOrder < fromCategories.length) {
      selectedCategory.orderDecreaseAllowed = true
    }

    setSelectedCategory(selectedCategory)
    setEditingMode(false)
    setEditingItem(null)
  }

  const CenterPanel = () => {
    if (isEditing) {
      return (
        <ItemEditView
          organizationId={organizationId}
          selectedCategory={selectedCategory}
          itemToEdit={editingItem}
          closeEdit={toggleEditing}
        />
      )
    } else {
      return (
        <ItemsListView
          organizationId={organizationId}
          selectedCategory={selectedCategory}
          setEditingItem={toggleEditing}
          toggleEditing={() => setEditingMode(true)}
          refreshCategories={refreshCategories}
        />
      )
    }
  }

  return (
    <div className="menu">
      <div className="menu__categories">
        <CategoriesView
          organizationId={organizationId}
          selectCategory={selectCategory}
          categories={categories}
          refreshCategories={refreshCategories}
        />
      </div>

      <div className="menu__items">
        <CenterPanel/>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}
export default connect(mapStateToProps, null)(MenuList)
