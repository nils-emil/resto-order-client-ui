const express = require('express');
const router = express.Router({mergeParams: true});

const Order = require('./../../models/order').Order;

router.route('/add').post(function (req, res) {
    let order = new Order(req.body);
    order.save()
        .then(e => {
            res.status(200).json(e);
        })
});

router.route('/').get(function (req, res) {
    Order.find((err, Orders) => {
        if (err) {
            console.log(err);
        } else {
            res.json(Orders);
        }
    });
});

router.route('/:barTabId/total-sum').get(function (req, res) {
    Order.find({"barTabId": req.params.barTabId})
        .populate('menuItem', "price")
        .exec()
        .then(orders => {
            res.json(orders.reduce((currentSum, order) => {
                return order.menuItem ? currentSum + order.menuItem.price : currentSum;
            }, 0))
        });
});

router.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    Order.findById(id, (err, orders) => {
        res.json(orders);
    });
});

router.route('/update/:id').post(function (req, res) {
    Order.findById(req.params.id, (err, order) => {
        if (!order)
            res.status(404).send("data is not found");
        else {
            order.title = req.body.title;
            order.description = req.body.description;
            order.organization = req.body.organization;
            order.save().then(() => {
                res.json('Update complete');
            })
                .catch(() => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

module.exports = router;