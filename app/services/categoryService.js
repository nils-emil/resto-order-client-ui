const Category = require('../models/category').Category
const MenuItem = require('../models/menuItem').MenuItem

module.exports = class CategoryService {

  async fetchAll(organizationId) {
    return Category.find({ organizationId: organizationId })
      .then(categories => {
        return categories
      })
  }

  async save(categoryDto) {
    let category = new Category(categoryDto)
    await category.save().then(() => {
      return category
    })
  }

  // TODO: Fix this shitty code
  async remove(id) {
    let organizationId = undefined
    await Category.findOne({ _id: id }).then(category => {
      organizationId = category.organizationId

      Category.updateMany({ order: { $gt: category.order, }}, {$inc: {order: -1} }).then(() => {

      })
    })

    let unClassifiedCategoryId = undefined
    await Category.findOne({ organizationId: organizationId, name: 'Kategooriata' }).then(category => {
      unClassifiedCategoryId = category._id
    })

    await Category.deleteOne({ _id: id }).then(() => {
      MenuItem.updateMany({ categoryId: id }, { $set: { categoryId: unClassifiedCategoryId } }, { multi: true }, () => {
      })
    })
  }

  async update(categoryDto) {
    let categoryToUpdate = undefined
    await Category.findOne({ _id: categoryDto._id }).then(category => {
      categoryToUpdate = category
    })

    if (categoryToUpdate.order !== categoryDto.order) {
      let categoryToChangePlace = undefined
      await Category.findOne({
        organizationId: categoryDto.organizationId,
        order: categoryDto.order
      }).then(category => {
        categoryToChangePlace = category
      })

      if (categoryToChangePlace !== undefined) {
        categoryToChangePlace.order = categoryToUpdate.order
        categoryToChangePlace.save()
      } else {
        return
      }

      categoryToUpdate.order = categoryDto.order
    } else {
      categoryToUpdate.name = categoryDto.name
      categoryToUpdate.name = categoryDto.name
    }

    categoryToUpdate.save()
  }
}
