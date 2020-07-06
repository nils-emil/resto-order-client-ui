const auth = require('../../middleware/auth')
const express = require('express')
const router = express.Router()

const TableService = require('../../services/tableService')
const tableService = new TableService()


router.get('/:organizationId', async (req, res) => {
  const organizationId = req.params.organizationId

  const tables = await tableService.fetchAll(organizationId)

  res.send(tables)
})

router.post('/', auth, async (req, res) => {
  const tableDto = req.body

  const table = tableService.update(tableDto)

  res.send(table)
})

module.exports = router
