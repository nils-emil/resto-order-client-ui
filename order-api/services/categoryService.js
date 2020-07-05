const Category = require('../models/category').Category
const MenuItem = require('../models/menuItem').MenuItem

module.exports = class CategoryService {

  async fetchAll(organizationId, includeWithoutCategory) {
    return Category.find({ organizationId: organizationId })
      .then(categories => {

        if (includeWithoutCategory) {
          let unCategorized = {
            '_id': null,
            'name': 'Kategooriata',
            'organizationId': organizationId,
            'order': categories.length + 1
          }

          return [...categories, unCategorized]
        }
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
    await Category.findOne({ _id: id }).then(category => {
      Category.updateMany({ order: { $gt: category.order } }, { $inc: { order: -1 } }).then(() => {
      })
    })

    await Category.deleteOne({ _id: id }).then(() => {
      MenuItem.updateMany({ categoryId: id }, { $set: { categoryId: null } }, { multi: true }, () => {
      })
    })
  }

  async update(categoryDto) {
    let categoryToUpdate = undefined
    await Category.findOne({ _id: categoryDto._id }).then(category => {
      categoryToUpdate = category
    })

    if (categoryToUpdate.order !== categoryDto.order) {
      let categoryToChangePlace
      await Category.findOne({
        organizationId: categoryDto.organizationId,
        order: categoryDto.order
      }).then(category => {
        categoryToChangePlace = category
      })

      if (categoryToChangePlace !== null) {
        categoryToChangePlace.order = categoryToUpdate.order
        categoryToChangePlace.save()
        categoryToUpdate.order = categoryDto.order
      }
    } else {
      categoryToUpdate.name = categoryDto.name
    }

    await categoryToUpdate.save()
    return categoryToUpdate
  }
}
