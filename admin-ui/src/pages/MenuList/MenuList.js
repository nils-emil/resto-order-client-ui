import React, { useEffect, useState } from 'react'
import './styles.scss'
import { connect } from 'react-redux/es/alternate-renderers'
import CategoriesView from './components/CategoriesView/CategoriesView'
import ItemsListView from './components/ItemsListView/ItemsListView'
import Navigation, { pages } from '../../components/Navigation/Navigation'
import ItemEditView from './components/ItemEditView/ItemEditView'
import { getCategories } from '../../services/categoryService'

function MenuList(props) {
  const { organizationId } = props.auth.user.data

  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState({ _id: 0 })
  const [isEditing, setEditingMode] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  useEffect(() => {
    refreshCategories()
  }, [])

  const refreshCategories = (categoryToSelect) => {
    getCategories(organizationId).subscribe(e => {
      setCategories(e.data)
      if (categoryToSelect) {
        setSelectedCategory(e.data.find(category => category.order === categoryToSelect.order))
      } else {
        setSelectedCategory({ ...e.data[0], orderDecreaseAllowed: false,  orderIncreaseAllowed: true})
      }
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

  const selectCategory = (category) => {
    if (categories.length > 2 && categories[categories.length - 1]._id !== category._id) {
      category.orderIncreaseAllowed = true
    }
    if (categories.length > 2 && categories[1]._id !== category._id) {
      category.orderDecreaseAllowed = true;
    }
    setSelectedCategory(category)
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

      <div className="menu__navigation">
        <Navigation currentPage={pages.MENU}/>
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
