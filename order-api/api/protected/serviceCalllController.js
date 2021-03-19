const express = require('express')
const router = express.Router({mergeParams: true})
const Order = require('../../models/order').Order

router.route('/all').get(async function (req, res) {
    let org = await global.extractOrganizationFromRequest(req)
    Order
        .find({})
        .populate('orderContent.menuItemId')
        .sort({createdTime: -1})
        .exec((err, orders) => {
            console.log(orders)
            res.json(orders)
        })
})

module.exports = router

