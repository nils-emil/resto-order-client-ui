import React from 'react'
import './styles.scss'
import { createCategory } from '../../../../services/categoryService'
import { loadModal } from '../../../../store/actions/modal'
import { connect } from 'react-redux'
import { TEXT_INPUT_MODAL } from '../../../../components/Modal/Types'
import TextButtonWithIcon from '../../../../components/TextButtonWithIcon/TextButtonWithIcon'

function CategoriesView(props) {

  const { categories, refreshCategories, selectCategory, organizationId } = props

  const createCategoryHandler = (data) => {
    const category = {
      name: data.text,
      order: categories.length,
      organizationId: organizationId
    }

    return createCategory(category).subscribe(e => {
      refreshCategories(category.order)
    })
  }

  const openCategoryAddModal = () => {
    props.loadModal(TEXT_INPUT_MODAL, {
      modalResponseCallback: createCategoryHandler,
      header: 'Lisa kategooria',
      textFieldName: 'Kategooria nimi'
    })
  }

  function categoryComparor(a, b) {
    if (a.order === -1) {
      return 1
    }
    if (a.order > b.order) {
      return 1
    } else if (a.order < b.order) {
      return -1
    }
    return 0
  }

  return (
    <div className="categories-tab">
      <h1 className="categories-tab__header">Kategooriad</h1>
      <div className="categories-tab__category-container">
        {categories.sort(categoryComparor).map((category, index) => (
          <div
            className="categories-tab__category-item underline"
            key={category._id}
            onClick={() => selectCategory(index + 1)}
          >
            <p className="categories-tab__category-name">{category.name}</p>
          </div>
        ))}
      </div>
      <div className="categories-tab__add-new">
        <TextButtonWithIcon onClick={openCategoryAddModal}/>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  loadModal: (modelType, modalResponseCallback) => dispatch(loadModal(modelType, modalResponseCallback))
})

export default connect(null, mapDispatchToProps)(CategoriesView)

