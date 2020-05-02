const express = require('express');
const router = express.Router({mergeParams: true});

const Tab = require('../../models/tab').Tab
const Table = require('../../models/table').Table

router.route('/tab/add').post(function (req, res) {
    let tab = new Tab(req.body);
    tab["active"] = true;
    tab.save()
      .then(e => {
          res.status(200).json(e)
      })
});

router.route('/get-all-tabs/:tableCode').get(function (req, res) {
    let tableCode = req.params.tableCode;
    Tab.find({"tableCode": tableCode, "active": true})
      .exec()
      .then(e => {
          res.status(200).json(e)
      })
});

router.route('/payment/:id').post(function (req, res) {
    // TODO
    res.status(200).json("ok");
});

router.route('/payment/bar-tab/:id').post(function (req, res) {
    // TODO
    res.status(200).json("ok");
});

router.route('/add').post(function (req, res) {
    let table = new Table(req.body);
    table.save()
      .then(e => {
          res.status(200).json(e)
      })
});

router.route('/:tableCode').get(function (req, res) {
    let code = req.params.tableCode;
    console.log(code);
    Table.findOne({code: code}, function (err, MenuItem) {
        res.json(MenuItem);
    });
});

module.exports = router;
