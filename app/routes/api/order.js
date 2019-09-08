const express = require('express');
const router = express.Router({mergeParams: true});

let Order = require('./../../models/order');

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

router.route('/totalSum').get(function (req, res) {
    Order.find()
        .populate('menuItemId', "price")
        .exec()
        .then( orders => {
            console.log(JSON.stringify(orders));
            res.json(orders.reduce((a, b) =>  {
                return a + b.menuItemId.price
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