const express = require('express');
const router = express.Router({mergeParams: true});
const Order = require('../../models/order').Order

// TODO add by organization id
router.route('/all').get(function (req, res) {
  Order.find({}).populate('orderContent.menuItemId')
    .then(allOrdersFromTable => {
      res.json(allOrdersFromTable);
    })
});

// TODO add by organization id
router.route('/:tableCode').get(function (req, res) {
    let id = req.params.tableCode;
    Order.find({ tableCode: id }).populate('orderContent.menuItemId')
      .then(allOrdersFromTable => {
              res.json(allOrdersFromTable);
      })
});

module.exports = router;

