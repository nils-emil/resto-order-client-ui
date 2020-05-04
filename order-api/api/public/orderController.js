const express = require('express');
const router = express.Router({mergeParams: true});

const Order = require('../../models/order').Order
const MenuItemAmount = require('../../models/order').MenuItemAmount

router.route('/add/:tableCode').post(function (req, res) {
    let listOfOrderedMenuItemsWithAmounts = []
    let orderData = {}
    for (let i in req.body) {
        let menuItemAmountInformation = {}
        menuItemAmountInformation.amount = req.body[i].amount
        menuItemAmountInformation.menuItemId = req.body[i].item._id
        orderData.organizationId = req.body[i].item.organizationId
        listOfOrderedMenuItemsWithAmounts.push(new MenuItemAmount(menuItemAmountInformation))
    }
    orderData.tableCode = req.params.tableCode;
    orderData.orderContent = listOfOrderedMenuItemsWithAmounts
    orderData.paid = false
    orderData.cancelled = false
    let order = new Order(orderData);
    order.save()
      .then(e => {
          res.status(200).json(e)
      })
});

module.exports = router;

