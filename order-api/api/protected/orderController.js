const express = require('express')
const router = express.Router({ mergeParams: true })
const Order = require('../../models/order').Order
const timeUtil = require('../../util/timeUtil')

// TODO add by organization id
router.route('/all').get(function (req, res) {
  Order.find({ createdDate: timeUtil.extractTime(new Date()).date }).populate('orderContent.menuItemId')
    .sort({ createdTime: -1 })
    .exec((err, orders) => {
      res.json(orders)
    })
})

// TODO add by organization id
router.route('/:tableCode').get(function (req, res) {
  let id = req.params.tableCode
  Order.find({ createdDate: timeUtil.extractTime(new Date()).date, tableCode: id }).populate('orderContent.menuItemId')
    .sort({ createdTime: -1 })
    .then(allOrdersFromTable => {
      res.json(allOrdersFromTable)
    })
})

module.exports = router

