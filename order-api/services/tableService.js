const Table = require('../models/table').Table

module.exports = class CategoryService {

  async fetchAll(organizationId) {
    return Table.find({ organizationId: organizationId })
      .then(tables => {
        return tables
      })
  }

}
