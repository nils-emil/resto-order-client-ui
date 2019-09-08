const express = require('express');
const router = express.Router({mergeParams: true});

const Tab = require('../../models/tab').Tab;

router.route('/add').post(function (req, res) {
    let tab = new Tab(req.body);
    tab.actice = true;
    tab.save()
        .then(e => {
            res.status(200).json(e);
        })
});

router.route('get-all/:tableCode').get(function (req, res) {
    let tableCode = req.params.tableCode;
    Tab.find({"tableCode": tableCode, "active": true})
        .exec()
        .then(e => {
            res.status(200).json(e);
        })
});

router.route('payment/table/:id').post(function (req, res) {
    // TODO
    res.status(200).json("ok");
});

router.route('payment/bar-tab/:id').post(function (req, res) {
    // TODO
    res.status(200).json("ok");
});

module.exports = router;